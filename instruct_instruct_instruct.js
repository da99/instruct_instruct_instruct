"use strict";

/* jshint undef: true, unused: true */
/* global _ */ 

var instrust_instruct_instruct = function (code, funcs) {
  this.code  = code;
  this.funcs = funcs;
  this.stack = null;
  return this;
};


// === Scope
(function () {
  var I = instrust_instruct_instruct;

  function is_numeric(val) {
    return _.isNumber(val) && !_.isNaN(val);
  }

  function inspect(o) {
    return '(' + typeof(o) + ') "' + o + '"' ;
  }

  I.prototype.run = function () {
    var i      = 0;
    var left   = [];
    var stack  = this.stack = _.dup(this.code);
    var o      = null;
    var last_o = null;

    var env = {
      pop_num: function () {
        if (_.isEmpty(stack))
          throw new Error("Left Stack underflow while popping for num.");
        var num = stack.pop();
        if (!is_numeric(num))
          throw new Error("Left Stack popped value is not a number: " + inspect(num));
        return num;
      },
      shift_num: function () {
        if (_.isEmpty(this.args))
          throw new Error("Argument Stack underflow while shifting for num.");
        var num = stack.pop();
        if (!is_numeric(num))
          throw new Error("Argument Stack shifted value is not a number: " + inspect(num));
        return num;
      },
    };

    while (!_.isEmpty(stack)) {
      o = stack[i];
      if (_.isString(o) || is_numeric(o)) {
        left.push(o);
      } else if (_.isArray(o)) {
        if (!_.isString(last_o))
          throw new Error('Invalid data type for function name: ' + inspect(o));
        env.stack = stack;
        env.args  = o;
        stack.unshift( this.funcs[left.pop()](env) );
      } else {
        throw new Error("Invalid data type: " + inspect(o));
      }

      last_o = o;
      i = i + 1;
    } // === while i < size

  }; // function
})();
