const environment = process.env.APP_ENV;
const webUrl = process.env.WEB_URL;
const apiUrl = process.env.API_URL;

if (!environment) {
  console.error('APP_ENV is required.');
  process.exit(1);
}

if (!webUrl) {
  console.error('WEB_URL is required.');
  process.exit(1);
}

if (!apiUrl) {
  console.error('API_URL is required.');
  process.exit(1);
}

const checks = [
  {
    name: 'API health',
    url: `${apiUrl}/api/health`,

    validate: async (response) => {
      const body = await response.json();

      if (body.status !== 'ok') {
        throw new Error(`Unexpected API health status: ${body.status}`);
      }
    },
  },

  {
    name: 'API products',
    url: `${apiUrl}/api/products`,

    validate: async (response) => {
      const body = await response.json();

      if (!Array.isArray(body.products)) {
        throw new Error('API products response does not contain a products array.');
      }
    },
  },

  {
    name: 'Web health',
    url: `${webUrl}/health`,

    validate: async (response) => {
      const body = await response.json();

      if (body.status !== 'ok') {
        throw new Error(`Unexpected web health status: ${body.status}`);
      }
    },
  },

  {
    name: 'Web API proxy',
    url: `${webUrl}/api/products`,

    validate: async (response) => {
      const body = await response.json();

      if (!Array.isArray(body.products)) {
        throw new Error('Web proxy response does not contain a products array.');
      }
    },
  },
];

const sleep = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

async function verify(check, options = {}) {
  const attempts = options.attempts ?? 30;
  const delay = options.delay ?? 2_000;
  const requestTimeout = options.requestTimeout ?? 5_000;

  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      console.log(`Checking ${check.name} ` + `(${attempt}/${attempts})...`);

      const response = await fetch(check.url, {
        signal: AbortSignal.timeout(requestTimeout),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ` + `${response.statusText}`);
      }

      if (check.validate) {
        await check.validate(response);
      }

      console.log(`✓ ${check.name}: ${check.url}`);

      return;
    } catch (error) {
      lastError = error;

      const message = error instanceof Error ? error.message : String(error);

      console.log(`✗ ${check.name} failed: ${message}`);

      if (attempt < attempts) {
        console.log(`Retrying in ${delay}ms...`);

        await sleep(delay);
      }
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);

  throw new Error(`${check.name} failed after ` + `${attempts} attempts: ${message}`);
}

async function main() {
  console.log(`Starting ${environment} deployment verification`);

  console.log(`WEB_URL=${webUrl}`);
  console.log(`API_URL=${apiUrl}`);

  console.log('');

  for (const check of checks) {
    await verify(check);
  }

  console.log('');
  console.log(`✓ ${environment} deployment verification passed.`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error('');
  console.error(`Deployment verification failed: ${message}`);

  process.exit(1);
});
