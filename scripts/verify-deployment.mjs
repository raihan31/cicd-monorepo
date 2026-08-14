const environment = process.env.APP_ENV ?? 'development';

const configurations = {
  development: {
    webUrl: 'http://localhost:8080',
    apiUrl: 'http://localhost:3000',
  },

  staging: {
    webUrl: 'http://localhost:8180',
    apiUrl: 'http://localhost:3100',
  },
};

const configuration = configurations[environment];

if (!configuration) {
  console.error(`Unsupported environment: ${environment}`);

  process.exit(1);
}

const checks = [
  {
    name: 'API health',
    url: `${configuration.apiUrl}/api/health`,
  },
  {
    name: 'API products',
    url: `${configuration.apiUrl}/api/products`,
  },
  {
    name: 'Web health',
    url: `${configuration.webUrl}/health`,
  },
  {
    name: 'Web to API proxy',
    url: `${configuration.webUrl}/api/products`,
  },
];

const sleep = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

async function verify(check, attempts = 30) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(check.url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      console.log(`✓ ${check.name}: ${check.url}`);

      return;
    } catch (error) {
      lastError = error;

      console.log(`Waiting for ${check.name} ` + `(${attempt}/${attempts})`);

      await sleep(2_000);
    }
  }

  throw new Error(
    `${check.name} failed: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
  );
}

async function main() {
  console.log(`Verifying ${environment} deployment`);

  for (const check of checks) {
    await verify(check);
  }

  console.log(`${environment} deployment verified successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
