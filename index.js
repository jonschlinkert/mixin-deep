'use strict';

var isObject = require('is-plain-object');
var forIn = require('for-own');

module.exports = function deepMixin(o, objects) {
  if (!o || !objects) { return o || {}; }

  var len = arguments.length - 1;

  function copy(value, key) {
    var obj = this[key];
    if (isObject(value) && isObject(obj)) {
      deepMixin(obj, value);
    } else {
      this[key] = value;
    }
  }

  for (var i = 0; i < len; i++) {
    var obj = arguments[i + 1];

    if (isObject(obj)) {
      forIn(obj, copy, o);
    }
  }
  return o;
};
