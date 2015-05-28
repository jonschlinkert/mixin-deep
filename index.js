'use strict';

var isObject = require('is-plain-object');
var forOwn = require('for-own');

function mixinDeep(o, objects) {
  if (!isObject(o)) return {};
  if (!isObject(objects)) return o;

  // don't slice args for v8 optimizations
  var len = arguments.length - 1;
  for (var i = 0; i < len; i++) {
    var obj = arguments[i + 1];
    if (isObject(obj)) {
      forOwn(obj, copy, o);
    }
  }
  return o;
}

/**
 * copy properties from the source object to the
 * target object.
 *
 * @param  {*} `value`
 * @param  {String} `key`
 */

function copy(value, key) {
  var obj = this[key];
  if (isObject(value) && isObject(obj)) {
    mixinDeep(obj, value);
  } else {
    this[key] = value;
  }
}

/**
 * Expose `mixinDeep`
 */

module.exports = mixinDeep;
