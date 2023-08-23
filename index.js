'use strict';

const isObject = val => {
  return typeof val === 'function' || (typeof val === 'object' && val !== null && !Array.isArray(val));
};

const isValidKey = key => {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};

const mixinDeep = (target, ...rest) => {
  for (let obj of rest) {
    if (isObject(obj)) {
      for (let key in obj) {
        if (isValidKey(key)) {
          mixin(target, obj[key], key);
        }
      }
    }
  }
  return target;
};

function mixin(target, val, key) {
  let obj = target[key];
  if (isObject(val) && isObject(obj)) {
    mixinDeep(obj, val);
  } else if (!(key in target) && isObject(val)) {
    // `target` can be mutated by later mixins. Therefore, if we are currently adding an object to `target`,
    // it could be mutated later. We need to make sure that mutation will not change the original data.
    target[key] = {...val};
  } else {
    target[key] = val;
  }
}

/**
 * Expose mixinDeep
 * @type {Function}
 */

module.exports = mixinDeep;
