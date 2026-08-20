const environment = process.env.APP_ENV;
const webImage = process.env.WEB_IMAGE;
const apiImage = process.env.API_IMAGE;

if (!environment) {
  console.error('APP_ENV is required.');
  process.exit(1);
}

if (!webImage) {
  console.error('WEB_IMAGE is required.');
  process.exit(1);
}

if (!apiImage) {
  console.error('API_IMAGE is required.');
  process.exit(1);
}

if (environment !== 'production') {
  console.error(
    `Rollback is currently supported only for ` + `production. Received: ${environment}`,
  );

  process.exit(1);
}

async function rollback() {
  console.log('Starting production rollback.');
  console.log('');

  console.log('Rollback target:');

  console.log(`WEB_IMAGE=${webImage}`);
  console.log(`API_IMAGE=${apiImage}`);

  console.log('');

  /*
   * IMPORTANT:
   *
   * We have not connected a real deployment platform yet.
   *
   * Later this section will contain something like:
   *
   *   Kubernetes:
   *   kubectl / Helm / Argo CD
   *
   *   VM:
   *   SSH + Docker Compose
   *
   *   Cloud:
   *   provider deployment API
   *
   * The rollback MUST redeploy these existing images.
   *
   * It must NOT:
   *
   *   git checkout old commit
   *   npm install
   *   nx build
   *   docker build
   *
   * Rollback restores an existing known-good artifact.
   */

  console.log('TODO: Execute the real production rollback deployment.');

  console.log('');
  console.log('Rollback deployment command completed.');
}

rollback().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error(`Production rollback failed: ${message}`);

  process.exit(1);
});
