/*!
 * mixin-deep <https://github.com/jonschlinkert/mixin-deep>
 *
 * Copyright (c) 2014-present Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
const assert = require('assert');
const mixinDeep = require('./');

describe('.mixinDeep()', function() {
  it('should deeply mix the properties of object into the first object.', function() {
    const a = mixinDeep({ a: { aa: 'aa' } }, { a: { bb: 'bb' } }, { a: { cc: 'cc' } });
    assert.deepEqual(a, { a: { aa: 'aa', bb: 'bb', cc: 'cc' } });
    const b = mixinDeep(
      { a: { aa: 'aa', dd: { ee: 'ff' } } },
      { a: { bb: 'bb', dd: { gg: 'hh' } } },
      { a: { cc: 'cc', dd: { ii: 'jj' } } }
    );
    assert.deepEqual(b, { a: { aa: 'aa', dd: { ee: 'ff', gg: 'hh', ii: 'jj' }, bb: 'bb', cc: 'cc' } });
  });

  it('should copy properties onto the first object', function() {
    const obj1 = { a: 0, b: 1 };
    const obj2 = { c: 2, d: 3 };
    const obj3 = { a: 4, d: 5 };

    const actual = { a: 4, b: 1, c: 2, d: 5 };

    assert.deepEqual(mixinDeep({}, obj1, obj2, obj3), actual);
    assert.notDeepEqual(actual, obj1);
    assert.notDeepEqual(actual, obj2);
    assert.notDeepEqual(actual, obj3);
  });

  it('should copy properties onto the first object without modifying other sub-objects', function() {
    const obj1 = { x: { a: 0, b: 1 } };
    const obj2 = { x: { c: 2, d: 3 } };
    const obj3 = { x: { a: 4, d: 5 } };

    const actual = { x: { a: 4, b: 1, c: 2, d: 5 } };

    assert.deepEqual(mixinDeep({}, obj1, obj2, obj3), actual);
    assert.notDeepEqual(actual, obj1);
    assert.notDeepEqual(actual, obj2);
    assert.notDeepEqual(actual, obj3);
  });

  it('should mixin nested object properties', function() {
    const obj1 = { a: { b: 1, c: 1, d: { e: 1, f: 1 } } };
    const obj2 = { a: { b: 2, d: { f: 'f' } } };

    assert.deepEqual(mixinDeep(obj1, obj2), { a: { b: 2, c: 1, d: { e: 1, f: 'f' } } });
  });

  it('should use the last value defined', function() {
    const obj1 = { a: 'b' };
    const obj2 = { a: 'c' };

    assert.deepEqual(mixinDeep(obj1, obj2), { a: 'c' });
  });

  it('should use the last value defined on nested object', function() {
    const obj1 = { a: 'b', c: { d: 'e' } };
    const obj2 = { a: 'c', c: { d: 'f' } };

    assert.deepEqual(mixinDeep(obj1, obj2), { a: 'c', c: { d: 'f' } });
  });

  it('should shallow mixin when an empty object is passed', function() {
    const obj1 = { a: 'b', c: { d: 'e' } };
    const obj2 = { a: 'c', c: { d: 'f' } };

    const res = mixinDeep({}, obj1, obj2);
    assert.deepEqual(res, { a: 'c', c: { d: 'f' } });
  });

  it('should mixin additional objects into the first:', function() {
    const obj1 = { a: { b: 1, c: 1, d: { e: 1, f: 1 } } };
    const obj2 = { a: { b: 2, d: { f: 'f' } } };

    mixinDeep(obj1, obj2);
    assert.deepEqual(obj1, { a: { b: 2, c: 1, d: { e: 1, f: 'f' } } });
  });

  it('should mixin objects during mixin', function() {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { c: 2 } };

    const actual = mixinDeep({}, obj1, obj2);
    assert.deepEqual(actual, { a: { b: 1, c: 2 } });
    assert.notDeepEqual(actual.a, obj1.a);
    assert.notDeepEqual(actual.a, obj2.a);
  });

  it('should deep mixin arrays during mixin', function() {
    const obj1 = { a: [1, 2, [3, 4]] };
    const obj2 = { b: [5, 6] };

    const actual = mixinDeep(obj1, obj2);
    assert.deepEqual(actual.a, [1, 2, [3, 4]]);
    assert.deepEqual(actual.a[2], [3, 4]);
    assert.deepEqual(actual.b, obj2.b);
  });

  it('should not modify source properties', function() {
    assert.equal(mixinDeep({ test: true }).test, true);
  });

  it('should not mixin arrays', function() {
    assert.deepEqual(mixinDeep([1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(mixinDeep([1, 2, 3], {}), [1, 2, 3]);
  });

  it('should work with sparse objects:', function() {
    const actual = mixinDeep({}, undefined, { a: 'b' }, undefined, { c: 'd' });
    assert.deepEqual(actual, { a: 'b', c: 'd' });
  });

  it('should mixin RegExps', function() {
    const fixture = /test/g;
    const actual = mixinDeep(fixture);
    assert.deepEqual(actual, fixture);
  });

  it('should mixin Dates', function() {
    const fixture = new Date();
    const actual = mixinDeep(fixture);
    assert.deepEqual(actual, fixture);
  });

  it('should not mixin objects created with custom constructor', function() {
    function TestType() {}
    const fixture = new TestType();
    const actual = mixinDeep(fixture);
    assert.deepEqual(actual, fixture);
  });
});
