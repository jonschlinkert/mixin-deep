/*!
 * mixin-deep <https://github.com/jonschlinkert/mixin-deep>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

/* deps: mocha */
require('should');
var mixinDeep = require('./');

describe('.mixinDeep()', function () {
  it('should deeply mix the properties of object into the first object.', function () {
    var a = mixinDeep({a: {aa: 'aa'} }, {a: {bb: 'bb'} }, {a: {cc: 'cc'} }); a.should.eql({a: {aa: 'aa', bb: 'bb', cc: 'cc'} });
    var b = mixinDeep({a: {aa: 'aa', dd: {ee: 'ff'} } }, {a: {bb: 'bb', dd: {gg: 'hh'} } }, {a: {cc: 'cc', dd: {ii: 'jj'} } });
    b.should.eql({a: {aa: 'aa', dd: {ee: 'ff', gg: 'hh', ii: 'jj'}, bb: 'bb', cc: 'cc'} });
  });

  it('should merge object properties without affecting any object', function () {
    var obj1 = {a: 0, b: 1};
    var obj2 = {c: 2, d: 3};
    var obj3 = {a: 4, d: 5};

    var actual = {a: 4, b: 1, c: 2, d: 5 };

    mixinDeep({}, obj1, obj2, obj3).should.eql(actual);
    actual.should.not.eql(obj1);
    actual.should.not.eql(obj2);
    actual.should.not.eql(obj3);
  });

  it('should do a deep merge', function () {
    var obj1 = {a: {b: 1, c: 1, d: {e: 1, f: 1}}};
    var obj2 = {a: {b: 2, d : {f : 'f'} }};

    mixinDeep(obj1, obj2).should.eql({a: {b: 2, c: 1, d: {e: 1, f: 'f'} }});
  });

  it('should merge additional objects into the first:', function () {
    var obj1 = {a: {b: 1, c: 1, d: {e: 1, f: 1}}};
    var obj2 = {a: {b: 2, d : {f : 'f'} }};

    mixinDeep(obj1, obj2);
    obj1.should.eql({a: {b: 2, c: 1, d: {e: 1, f: 'f'} }});
  });

  it('should clone objects during merge', function () {
    var obj1 = {a: {b :1}};
    var obj2 = {a: {c :2}};

    var actual = mixinDeep({}, obj1, obj2);
    actual.should.eql({a:{b:1, c:2}});
    actual.a.should.eql(obj1.a);
    actual.a.should.not.eql(obj2.a);
  });

  it('should deep clone arrays during merge', function () {
    var obj1 = {a: [1, 2, [3, 4]]};
    var obj2 = {b : [5, 6]};

    var actual = mixinDeep(obj1, obj2);
    actual.a.should.eql([1, 2, [3, 4]]);
    actual.a[2].should.eql([3, 4]);
    actual.b.should.eql(obj2.b);
  });

  it('should copy source properties', function() {
    mixinDeep({ test: true }).test.should.be.true;
  });

  it('should not clone arrays', function() {
    mixinDeep([1, 2, 3]).should.eql([1, 2, 3]);
    mixinDeep([1, 2, 3], {}).should.eql([1, 2, 3]);
  });

  it('should work with sparse objects:', function() {
    var actual = mixinDeep({}, undefined, {a: 'b'}, undefined, {c: 'd'});
    actual.should.eql({a: 'b', c: 'd'});
  });

  it('should clone RegExps', function() {
    var fixture = /test/g;
    var actual = mixinDeep(fixture);
    actual.should.eql(fixture);
  });

  it('should clone Dates', function() {
    var fixture = new Date();
    var actual = mixinDeep(fixture);
    actual.should.eql(fixture);
  });

  it('should not clone objects created with custom constructor', function() {
    function TestType() { }
    var fixture = new TestType();
    var actual = mixinDeep(fixture);
    actual.should.eql(fixture);
  });
});