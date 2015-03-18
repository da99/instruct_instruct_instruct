"use strict";

console.log
/* jshint undef: true, unused: true */
/* global _ */ 

var instruct_instruct_instruct = function (funcs) {
  this.funcs = _.merge(instruct_instruct_instruct.base, funcs);
  this.stack = null;
  return this;
};


// === Scope
(function () {
  var I = instruct_instruct_instruct;

  function log() {
    if (window.console)
      console.log.apply(console, arguments);
  }; // function

  function is_numeric(val) {
    return _.isNumber(val) && !_.isNaN(val);
  }

  function concat() {
    var args = _.toArray(arguments);
    var base = _.first(args);
    var arrs = _.rest(args);
    _.each(arrs, function (v, i) {
      _.each(v, function (val) {
        base.push(val);
      });
    });
    return base;
  }

  function inspect(o) {
    return '(' + typeof(o) + ') "' + o + '"' ;
  }

  instruct_instruct_instruct.base = {
    'add to stack': function (iii) {
      concat(iii.stack, iii.args);
    },
    'array': function (iii) {
      return iii.args;
    },
    'less or equal': function (iii) {
      var left = iii.pop_num();
      var right = iii.shift_num();
      return left <= right;
    },
    'bigger or equal': function (iii) {
      var left = iii.pop_num();
      var right = iii.shift_num();
      return left >= right;
    },
    'bigger': function (iii) {
      return iii.pop_num() > iii.shift_num();
    },
    'less': function (iii) {
      return iii.pop_num() < iii.shift_num();
    },
    'equal': function (iii) {
      var left  = iii.pop();
      var right = iii.shift();
      var l_type = typeof(left);
      var r_type = typeof(right);

      if (l_type !== r_type)
        throw new Error("Type mis-match: " + inspect(left) + ' !== ' + inspect(right));
      return left === right;
    }
  };

  I.prototype.spawn = function () {
    var funcs = _.clone(this.funcs);
    return new instruct_instruct_instruct(funcs);
  }; // function

  I.prototype.run = function (raw_code) {
    var left      = [];
    var code      = _.clone(raw_code);
    var o         = null;
    var last_o    = null;
    var func_name = null;
    var result    = null;

    var env = {
      stack: left,
      pop: function () {
        if (_.isEmpty(left))
          throw new Error("Left Stack underflow while popping.");
        return left.pop();
      },
      shift: function () {
        if (_.isEmpty(this.args))
          throw new Error("Argument Stack underflow while shifting for num.");
        return this.args.pop();
      },
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
      }
    };

    while (!_.isEmpty(code)) {
      o = code.shift();
      if (_.isString(o) || is_numeric(o)) {
        left.push(o);
      } else if (_.isArray(o)) {
        if (!_.isString(last_o)) {
          throw new Error('Invalid data type for function name: ' + inspect(last_o));
        }
        env.args   = this.spawn().run(o).stack;
        func_name  = left.pop();
        if (!this.funcs[func_name])
          throw new Error("Func not found: " + func_name);
        result = this.funcs[func_name](env);
        if (result !== undefined)
          left.unshift( result );
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
