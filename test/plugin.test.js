const { existsSync: exists } = require('fs');
const { join } = require('path');

const test = require('ava');
const execa = require('execa');

const { WebpackPluginRamdisk } = require('../lib');

const detatch = WebpackPluginRamdisk.cleanup;

const getSize = (diskPath) => {
  const { stdout } = execa.commandSync(`df -H ${diskPath}`);
  const [, info] = stdout.split('\n');
  const [, diskSize] = info.split(/\s+/);

  return diskSize;
};

test('defaults', (t) => {
  const plugin = new WebpackPluginRamdisk();
  const { diskPath } = plugin;
  t.snapshot(plugin.options);
  t.truthy(diskPath);
  t.falsy(plugin.outputPath);

  t.snapshot(getSize(diskPath));

  detatch(diskPath);
});

test('options', (t) => {
  const plugin = new WebpackPluginRamdisk({
    bytes: 5.12e8,
    name: 'batcave'
  });
  const { diskPath } = plugin;
  t.snapshot(plugin.options);
  t.truthy(diskPath);
  t.falsy(plugin.outputPath);

  t.snapshot(getSize(diskPath));

  detatch(diskPath);
});

test('stub compiler', (t) => {
  const plugin = new WebpackPluginRamdisk({ name: 'stub' });
  const { diskPath } = plugin;
  const compiler = { options: { output: {} } };
  const expectedPath = join(diskPath, 'dist');

  plugin.apply(compiler);

  t.truthy(plugin.outputPath);
  t.is(plugin.outputPath, compiler.outputPath);
  t.is(compiler.outputPath, compiler.options.output.path);
  t.is(plugin.outputPath, expectedPath);

  detatch(diskPath);
});

test('simple config', (t) => {
  const cwd = join(__dirname, 'fixtures/simple');
  const { stdout } = execa.commandSync(`npx wp`, { cwd });
  const [, outputPath] = stdout.match(/written to (.+)\n?/);
  const [diskPath] = outputPath.match(/((.+)simpleconfig)/);

  t.snapshot(outputPath);
  t.snapshot(diskPath);
  t.true(exists(join(outputPath, 'output.js')));

  detatch(diskPath);
});
