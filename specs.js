"use strict";
/* jshint undef: true, unused: true */
/* global instruct_instruct_instruct, describe, it, expect */ 

var iii = new instruct_instruct_instruct(
  {plus: function (iii) {
    return iii.pop_num() + iii.shift_num();
  }}
);

describe("instruct_instruct_instruct", function () {

  it('runs the code', function () {
    expect(iii.run([5, 'plus', [5]]).stack).toEqual([10]);
  }); // === it

  it('throws Error if function name is not a String', function () {
    expect(function () { iii.run([5, 5, [5]]); }).toThrow(new Error('Invalid data type for function name: (number) "5"'));
  }); // === it

  it('throw Error if value is an object', function () {
    expect(function () { iii.run([5, 5, {}]); }).toThrow(new Error("Invalid data type: (object) \"[object Object]\""));
  }); // === it

}); // === describe
