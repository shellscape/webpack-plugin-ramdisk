const test = require('ava');

const { WebpackPluginRamdisk } = require('../lib');

test('defaults', (t) => {
  const plugin = new WebpackPluginRamdisk();
  t.snapshot(plugin.options);
});
