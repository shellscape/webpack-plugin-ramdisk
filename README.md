[tests]: 	https://img.shields.io/circleci/project/github/shellscape/webpack-plugin-ramdisk.svg
[tests-url]: https://circleci.com/gh/shellscape/webpack-plugin-ramdisk

[cover]: https://codecov.io/gh/shellscape/webpack-plugin-ramdisk/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/shellscape/webpack-plugin-ramdisk

[size]: https://packagephobia.now.sh/badge?p=webpack-plugin-ramdisk
[size-url]: https://packagephobia.now.sh/result?p=webpack-plugin-ramdisk

[https]: https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
[http2]: https://nodejs.org/api/http2.html#http2_http2_createserver_options_onrequesthandler
[http2tls]: https://nodejs.org/api/http2.html#http2_http2_createsecureserver_options_onrequesthandler

<div align="center">
	<img width="256" src="https://raw.githubusercontent.com/shellscape/webpack-plugin-ramdisk/master/assets/ramdisk.svg?sanitize=true" alt="webpack-plugin-ramdisk"><br/><br/>
</div>

[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# webpack-plugin-ramdisk

🐏 A webpack plugin for blazing fast builds on a RAM disk / drive

<a href="https://www.patreon.com/shellscape">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

_Please consider donating if you find this project useful._

## What It Does

This plugin will initialize and mount a [RAM disk / drive](https://en.wikipedia.org/wiki/RAM_drive) to enable faster build times. This has advantages over third-party in-memory filesystems in that it uses Node's `fs` module in conjunction with the local system's native capabilities. It's especially useful for projects which need to perform many successive builds.

## Requirements

`webpack-plugin-ramdisk` is an [evergreen 🌲](./.github/FAQ.md#what-does-evergreen-mean) module.

This module requires an [Active LTS](https://github.com/nodejs/Release) Node version (v10.0.0+).

## Install

Using npm:

```console
npm install webpack-nano webpack-plugin-ramdisk --save-dev
```

_Note: We recommend using [webpack-nano](https://github.com/shellscape/webpack-nano), a very tiny, very clean webpack CLI._

## Usage

When the plugin is applied during a webpack build, the `output` path specified for a compiler configuration is _appended to the RAMdisk path_. Be sure to choose an appropriate output path!

Create a `webpack.config.js` file:

```js
const { WebpackPluginRamdisk } = require('webpack-plugin-ramdisk');
const options = { ... };

module.exports = {
	// an example entry definition
	output: '/myapp/dist',
  ...
  plugins: [
    new WebpackPluginRamdisk(options)
  ]
};

```

And run `webpack`:

```console
$ npx wp
```

You'll then see that build output has been written to the RAMdisk. In our example above on a MacOS computer, the output path would be `/Volumes/wpr/myapp/dist`.

## Options

### `blockSize`
Type: `Number`<br>
Default: `512`

Sets the [block size](https://en.wikipedia.org/wiki/Block_(data_storage) used when allocating space for the RAMdisk.

### `bytes`
Type: `Number`<br>
Default: `2.56e8`

Sets the physical size of the RAMdisk, in bytes. The default value is 256mb. Most builds won't require nearly that amount, and the value can be lowered. For extremely large builds, this value may be increased as needed.

### `name`
Type: `String`<br>
Default: `wpr`

Sets the name of the disk/drive/mount point for the RAMdisk. e.g. A value of `batman` would result in a disk root of `/Volumes/batman` on MacOS and `/mnt/batman` on Linux variants.


### Linux Users

Automatic creation of a RAMdisk requires administrative permissions. During the build process you'll be prompted by `sudo` to enter your credentials.

### Windows Users

Unfortunately Windows does not ship with any capabilities that allow for creation of RAM disks / drives programmatically, without user interaction. This is an OS limitation and we cannot work around it. However, there is a solution for Windows users - tools like [ImDisk](https://sourceforge.net/projects/imdisk-toolkit/) will allow you to create a RAMdisk and assign it a drive letter, to which one can point a webpack configuration's `output` property.

## Removing the RAMdisk

_These commands use `wpr` as the RAMdisk name. If the `name` option has been modified, swap `wpr` for the value specified in the options._

On MacOS:

```console
$ umount /Volumes/wpr
$ hdiutil detach /Volumes/wpr
```

On Linux:

```console
$ sudo umount /mnt/wpr
```

## Meta

[CONTRIBUTING](./.github/CONTRIBUTING.md)

[LICENSE (Mozilla Public License)](./LICENSE)