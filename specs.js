"use strict";
/* jshint undef: true, unused: true */
/* global instruct_instruct_instruct, describe, it, expect */ 

describe("instruct_instruct_instruct", function () {

  it('runs the code', function () {
    var i = new instruct_instruct_instruct(
      [5, 'plus', [5]],
      {plus: function (iii) {
        return iii.pop_num() + iii.shift_num();
      }}
    );

    i.run();

    expect(i.stack).toEqual([10]);
  }); // === it

  it('throws Error if function name is not a String', function () {
    var i = new instruct_instruct_instruct([5, 5, [5]], {5: function () {}});
    expect(function () { i.run(); }).toThrow(new Error('Invalid data type for function name: (number) "5"'));
  }); // === it

  it('throw Error if value is an object', function () {
    var i = new instruct_instruct_instruct([5, 5, {}]);
    expect(function () { i.run(); }).toThrow(new Error("Invalid data type: (object) \"[object Object]\""));
  }); // === it

}); // === describe
