const { existsSync: exists } = require('fs');
const { join } = require('path');

const test = require('ava');
const execa = require('execa');

const { WebpackPluginRamdisk } = require('../lib');

const detatch = WebpackPluginRamdisk.cleanup;

test('multi config', (t) => {
  const cwd = join(__dirname, 'fixtures/multi');
  const { stdout } = execa.commandSync(`npx wp`, { cwd });
  const [, outputPath] = stdout.match(/written to (.+)\n?/);
  const [diskPath] = outputPath.match(/((.+)multiconfig)/);

  t.snapshot(outputPath.replace(/mnt|Volumes/, '[mount]'));
  t.snapshot(diskPath.replace(/mnt|Volumes/, '[mount]'));

  t.true(exists(join(outputPath, 'dist-app.js')));
  t.true(exists(join(__dirname, 'fixtures/multi/output/dist-worker.js')));

  detatch(diskPath);
});
