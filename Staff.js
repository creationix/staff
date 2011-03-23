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

var Events = {

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
Events.on = Events.addListener;
function Model(attributes, options) {
  attributes || (attributes = {});
}
Model.prototype = Object.create(Events, {constructor: {value: Model}});
Model.prototype.initialize = function initialize() {};
Model.prototype.get = function get(attr) {
  return this.attributes[attr];
}

function Collection(models, options) {
  options || (options = {});
}
Collection.prototype = Object.create(Events, {constructor: {value: Collection}});

function Controller(options) {
  options || (options = {});
}
Controller.prototype = Object.create(Events, {constructor: {value: Controller}});

function View(options) {
  options || (options = {});
}
View.prototype = Object.create(Events, {constructor: {value: View}});


Staff.Events = Events;
Staff.Model = Model;
Staff.Collection = Collection;
Staff.Controller = Controller;
Staff.View = View;

}());
