global.Staff = require('../Staff.js');
global.Assert = require('assert');
global.expect = expect;
global.fulfill = fulfill;

var expected = {};
function expect(name) {
  expected[name] = true;
}
function fulfill(name) {
  delete expected[name];
}
process.on('exit', function () {
  Object.keys(expected).forEach(function (name) {
    throw new Error("Missing expectation " + JSON.stringify(name));
  });
});


