/*!
 * mixin-deep <https://github.com/jonschlinkert/mixin-deep>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

require('should');
var mixinDeep = require('./');

describe('.mixinDeep()', function () {
  it('should deeply mix the properties of object into the first object.', function () {
    var a = mixinDeep({a: {aa: 'aa'} }, {a: {bb: 'bb'} }, {a: {cc: 'cc'} }); a.should.eql({a: {aa: 'aa', bb: 'bb', cc: 'cc'} });
    var b = mixinDeep({a: {aa: 'aa', dd: {ee: 'ff'} } }, {a: {bb: 'bb', dd: {gg: 'hh'} } }, {a: {cc: 'cc', dd: {ii: 'jj'} } });
    b.should.eql({a: {aa: 'aa', dd: {ee: 'ff', gg: 'hh', ii: 'jj'}, bb: 'bb', cc: 'cc'} });
  });
});