require('./common.js');

function Custom() {}
Custom.prototype = Object.create(Staff.Events, {constructor: {value: Custom}});

[
  function EmitNonExistant() {
    var c = new Custom();
    c.emit("DoesNotExist"); 
  },
  function CatchEvent() {
    var c = new Custom();
    var ballObj = {a:"Ball"};
    expect("catch ball"); 
    
    c.on('ball', function (ball) {
      Assert.strictEqual(ball, ballObj, "Event should preserve argument");
      fulfill('catch ball');
    });
    c.emit('ball', ballObj);
  },
  function RemoveAllEvents() {
    var c = new Custom();
    var ballObj = {a:"Ball"};
    c.on('ball', function (ball) {
      throw new Error("Should not have called me");
    });
    c.removeListener();
    c.emit('ball', ballObj);
  },
  function RemoveGroupOfEvents() {
    var c = new Custom();
    var ballObj = {a:"Ball"};
    c.on('ball', function (ball) {
      throw new Error("Should not have called me");
    });
    c.removeListener('ball');
    c.emit('ball', ballObj);
  },
  function RemoveSingle() {
    var c = new Custom();
    var ballObj = {a:"Ball"};
    function callback(ball) {
      throw new Error("Should not have called me");
    }
    c.on('ball', callback);
    c.removeListener('ball', callback);
    c.emit('ball', ballObj);
  }
].forEach(function (fn) { fn() });


