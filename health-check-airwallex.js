const fs = require('fs');
const path = require('path');

const root = __dirname;
const filesToCheck = [
  'src/lib/airwallex.ts',
  'src/components/quote/QuoteCalculator.tsx',
  'src/components/quote/FileUploader.tsx',
  'src/app/[locale]/quote/page.tsx',
  'src/components/payment/AirwallexDropIn.tsx',
  'functions/api/payment.ts',
];

const filesToDelete = [
  'src/app/api/airwallex/route.ts',
];

let exitCode = 0;

function log(status, message) {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} [${status}] ${message}`);
}

console.log('=== Airwallex Integration Health Check ===\n');

// 1. Check required files exist
log('INFO', 'Checking required files...');
filesToCheck.forEach((file) => {
  const fullPath = path.join(root, file);
  if (fs.existsSync(fullPath)) {
    log('PASS', `File exists: ${file}`);
  } else {
    log('FAIL', `File missing: ${file}`);
    exitCode = 1;
  }
});

// 2. Check conflicting files are removed
log('INFO', 'Checking conflicting files are removed...');
filesToDelete.forEach((file) => {
  const fullPath = path.join(root, file);
  if (fs.existsSync(fullPath)) {
    log('FAIL', `Conflicting file still exists: ${file}`);
    exitCode = 1;
  } else {
    log('PASS', `Conflicting file removed: ${file}`);
  }
});

// 3. Check .env.local is gitignored
log('INFO', 'Checking .env.local gitignore status...');
const gitignorePath = path.join(root, '.gitignore');
let gitignoreContent = '';
if (fs.existsSync(gitignorePath)) {
  gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
}
const envLocalIgnored =
  gitignoreContent.includes('.env.local') || gitignoreContent.includes('.env*');
if (envLocalIgnored) {
  log('PASS', '.env.local is excluded by .gitignore');
} else {
  log('FAIL', '.env.local is NOT excluded by .gitignore');
  exitCode = 1;
}

// 4. Check package.json dependencies
log('INFO', 'Checking package.json dependencies...');
const packageJsonPath = path.join(root, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const deps = { ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) };

const stripeDeps = Object.keys(deps).filter(
  (name) => name === 'stripe' || name.startsWith('@stripe/')
);
if (stripeDeps.length === 0) {
  log('PASS', 'No stripe dependencies found in package.json');
} else {
  log('FAIL', `Stripe dependencies still present: ${stripeDeps.join(', ')}`);
  exitCode = 1;
}

if (deps['airwallex-payment-elements']) {
  log('PASS', `airwallex-payment-elements is installed: ${deps['airwallex-payment-elements']}`);
} else {
  log('FAIL', 'airwallex-payment-elements is missing from package.json');
  exitCode = 1;
}

console.log('\n=== Health Check Complete ===');
if (exitCode !== 0) {
  console.log('Result: FAILED');
} else {
  console.log('Result: ALL CLEAR');
}
process.exit(exitCode);
