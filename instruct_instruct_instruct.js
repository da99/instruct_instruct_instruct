"use strict";

/* jshint undef: true, unused: true */
/* global _ */ 

var instruct_instruct_instruct = function (funcs) {
  this.funcs = funcs;
  this.stack = null;
  return this;
};


// === Scope
(function () {
  var I = instruct_instruct_instruct;

  function is_numeric(val) {
    return _.isNumber(val) && !_.isNaN(val);
  }

  function inspect(o) {
    return '(' + typeof(o) + ') "' + o + '"' ;
  }

  I.prototype.run = function (raw_code) {
    var left   = [];
    var code   = _.clone(raw_code);
    var o      = null;
    var last_o = null;

    var env = {
      pop_num: function () {
        if (_.isEmpty(left))
          throw new Error("Left Stack underflow while popping for num.");
        var num = left.pop();
        if (!is_numeric(num))
          throw new Error("Left Stack popped value is not a number: " + inspect(num));
        return num;
      },
      shift_num: function () {
        if (_.isEmpty(this.args))
          throw new Error("Argument Stack underflow while shifting for num.");
        var num = this.args.pop();
        if (!is_numeric(num))
          throw new Error("Argument Stack shifted value is not a number: " + inspect(num));
        return num;
      },
    };

    while (!_.isEmpty(code)) {
      o = code.shift();
      if (_.isString(o) || is_numeric(o)) {
        left.push(o);
      } else if (_.isArray(o)) {
        if (!_.isString(last_o)) {
          throw new Error('Invalid data type for function name: ' + inspect(last_o));
        }
        env.left   = left;
        env.args   = o;
        this.stack = left;
        left.unshift( this.funcs[left.pop()](env) );
      } else {
        throw new Error("Invalid data type: " + inspect(o));
      }

      last_o = o;
    } // === while i < size

    return {
      code: raw_code,
      stack: left
    };
  }; // function run

})(); // === scope
