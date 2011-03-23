// Inspired heavily by Backbone.js
// Modified to be more node.js and vanilla DOM style

(function(){

var Staff;
if (typeof exports !== 'undefined') {
  Staff = exports;
} else {
  Staff = this.Staff = {};
}

Staff.VERSION = "0.0.1";

Staff.Events = {

  addListener: function addListener(evt, callback) {
    var calls = this._callbacks || (this._callbacks = {});
    var list  = calls[evt] || (calls[evt] = []);
    list[list.length] = callback;
    return this;
  },
  
  removeListener: function removeListener(evt, callback) {
    if (!evt) {
      this._callbacks = {};
      return this;
    }
    var calls = this._callbacks;
    if (!calls) { return this; }
    var list = calls[evt];
    if (!list) { return this; }
    if (!callback) {
      calls[evt] = [];
      return this;
    }
    var index = list.indexOf(callback);
    if (index < 0) { return this; }
    list.splice(index, 1);
    return this;
  },
  
  emit: function emit(evt) {
    var calls = this._callbacks;
    if (!calls) { return this; }
    var list = calls[evt];
    if (!list) { return this; }
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = list.length; i < l; i++) {
      list[i].apply(this, args);
    }
    return this;
  }
};
Staff.Events.on = Staff.Events.addListener;

}());
