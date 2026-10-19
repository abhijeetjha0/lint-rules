import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function testESLintConfig(name, overrideConfigFile, targetFile) {
  process.stdout.write(`Testing ESLint [${name}] ... `);
  const eslint = new ESLint({
    overrideConfigFile: path.join(rootDir, overrideConfigFile),
    cwd: rootDir,
  });

  const results = await eslint.lintFiles([path.join(rootDir, targetFile)]);
  const errorCount = results.reduce((acc, r) => acc + r.errorCount, 0);

  if (errorCount > 0) {
    const formatter = await eslint.loadFormatter('stylish');
    console.error(`\nFAILED (${errorCount} errors):`);
    console.error(formatter.format(results));
    throw new Error(`ESLint [${name}] failed with ${errorCount} errors`);
  }

  console.log('PASSED');
}

async function testESLintReact() {
  process.stdout.write(`Testing ESLint [React Preset] ... `);
  const { default: baseConfig } = await import('../eslint/base.js');
  const { default: reactConfig } = await import('../eslint/react.js');

  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      ...baseConfig,
      ...reactConfig,
    ],
    cwd: rootDir,
  });

  const results = await eslint.lintFiles([path.join(rootDir, 'test/fixtures/valid-react.jsx')]);
  const errorCount = results.reduce((acc, r) => acc + r.errorCount, 0);

  if (errorCount > 0) {
    const formatter = await eslint.loadFormatter('stylish');
    console.error(`\nFAILED (${errorCount} errors):`);
    console.error(formatter.format(results));
    throw new Error(`ESLint [React Preset] failed with ${errorCount} errors`);
  }

  console.log('PASSED');
}

async function testStylelintConfig(name, configFile, targetFile) {
  process.stdout.write(`Testing Stylelint [${name}] ... `);
  const result = await stylelint.lint({
    configFile: path.join(rootDir, configFile),
    files: path.join(rootDir, targetFile),
    globbyOptions: { cwd: rootDir },
  });

  if (result.errored) {
    console.error(`\nFAILED:`);
    console.error(result.report);
    throw new Error(`Stylelint [${name}] failed`);
  }

  console.log('PASSED');
}

async function run() {
  console.log('--- Starting Lint Integration Tests ---');
  try {
    await testESLintConfig('JavaScript Base', 'eslint/base.js', 'test/fixtures/valid-js.js');
    await testESLintConfig('TypeScript', 'eslint/ts.js', 'test/fixtures/valid-ts.ts');
    await testESLintReact();
    await testStylelintConfig('CSS Standard', 'stylelint/css.js', 'test/fixtures/valid-css.css');
    await testStylelintConfig('SCSS Standard', 'stylelint/scss.js', 'test/fixtures/valid-scss.scss');
    console.log('\nAll 5 presets passed integration tests successfully!');
  } catch (err) {
    console.error('\nTest suite failed:', err.message);
    process.exit(1);
  }
}

run();
