const services = [
  {
    name: 'NestJS API health',
    url: 'http://localhost:3000/api/health',
  },
  {
    name: 'NestJS products',
    url: 'http://localhost:3000/api/products',
  },
  {
    name: 'Angular health',
    url: 'http://localhost:8080/health',
  },
  {
    name: 'Nginx API proxy',
    url: 'http://localhost:8080/api/products',
  },
];

const sleep = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

async function waitForService(service, attempts = 30) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(service.url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      console.log(`✓ ${service.name}: ${service.url}`);
      return;
    } catch (error) {
      lastError = error;

      console.log(`Waiting for ${service.name} ` + `(${attempt}/${attempts})...`);

      await sleep(2_000);
    }
  }

  throw new Error(
    `${service.name} did not become ready: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`,
  );
}

async function main() {
  for (const service of services) {
    await waitForService(service);
  }

  console.log('All container smoke tests passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
