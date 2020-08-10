'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultHapiOpts = exports.defaultExpressOpts = exports.defaultBrowserOpts = undefined;

var _encoding = require('./encoding');

var _util = require('./util');

/**
 * @function save
 * @description This handles saving a cookie in the browser and in memory/headers for server
 */

var cookie = require('cookie');
var _pick = require('lodash.pick');

var whiteListOpts = ['domain', 'expires', 'path', 'secure', 'httpOnly', 'sameSite'];

var defaultBrowserOpts = exports.defaultBrowserOpts = {
  path: '/',
  secure: true
};

var defaultExpressOpts = exports.defaultExpressOpts = {
  path: '/',
  secure: true
};

var defaultHapiOpts = exports.defaultHapiOpts = {
  path: '/',
  isSecure: true
};

exports.default = function (name, val) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var res = arguments[3];

  var options = _pick(opt, whiteListOpts);

  // browser
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize(name, (0, _encoding.encode)(val), Object.assign({}, defaultBrowserOpts, options));
  }

  // express
  if ((0, _util.isResWritable)(res) && res.cookie) {
    res.cookie(name, (0, _encoding.encode)(val), Object.assign({}, defaultExpressOpts, options));
  }

  // hapi
  if ((0, _util.isResWritable)(res) && res.state) {
    if ('undefined' !== typeof options.secure) {
      options.isSecure = options.secure;
    }
    res.state(name, (0, _encoding.encode)(val), Object.assign({}, defaultHapiOpts, options));
  }
};