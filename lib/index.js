/*
  Copyright © 2019 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { join } = require('path');

const chalk = require('chalk');

const { init } = require('./ramdisk');
const { validate } = require('./validate');

const defaults = {
  blockSize: 512,
  // 256 mb
  bytes: 2.56e8,
  name: 'wpr'
};
const { error, info } = console;
const key = 'webpack-plugin-ramdisk';
const name = 'WebpackPluginRamdisk';

class WebpackPluginRamdisk {
  constructor(opts = {}) {
    const valid = validate(opts);

    if (valid.error) {
      error(chalk.red(`⬢ ${key}:`), `An option was passed to ${name} that is not valid`);
      throw valid.error;
    }

    const options = Object.assign({}, defaults, opts);
    this.options = options;
  }

  async apply(compiler) {
    const diskPath = await init(this.options);
    const { output } = compiler.options;
    const outputPath = join(diskPath, output.path || 'dist');

    this.options.diskPath = diskPath;

    /* eslint-disable no-param-reassign */
    compiler.options.output = Object.assign({}, compiler.options.output, { path: outputPath });
    compiler.outputPath = compiler.options.output.path;

    info(chalk.blue(`⬡ ${key}:`), `Build being written to ${outputPath}`);
  }
}

module.exports = { defaults, WebpackPluginRamdisk };
