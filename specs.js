"use strict";
/* jshint undef: true, unused: true */
/* global instruct_instruct_instruct, describe, it, expect */ 

var iii = new instruct_instruct_instruct(
  {plus: function (iii) {
    return iii.pop('number') + iii.shift('number');
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

  it("it evals the args as code", function() {
    var result = iii.run([
      "add to stack", ["array", [1,2,3]]
    ]);

    expect(result.stack).toEqual([[1,2,3]]);
  });

  it("throws error if not enough stack values", function () {
    expect(function () {
      iii.run(['less or equal', [5]]);
    }).toThrow(new Error('Left Stack underflow while popping for number.'));
  });

  it("throws error if not enough arg values", function () {
    expect(function () {
      iii.run([5, 'less or equal', []]);
    }).toThrow(new Error('Argument Stack underflow while shifting for number.'));
  });

});
// === describe instruct_instruct_instruct ==========================


// ==================================================================
describe("less or equal", function () {
  it('it places true if: 5 <= 6', function () {
    var o = iii.run([
      5, "less or equal", [ 6 ]
    ]);
    expect( o.stack ).toEqual([true]);
  });

  it('it places true if: 6 <= 6', function () {
    var o = iii.run([
      6, "less or equal", [ 6 ]
    ]);
    expect(o.stack).toEqual([true]);
  });

  it('it places false if: 7 <= 6', function () {
    var o = iii.run([
      7, "less or equal", [ 6 ]
    ]);
    expect(o.stack).toEqual([false]);
  });

  it('throws error if first num is not a number', function () {
    expect(function () {
      iii.run([
        '5', 'less or equal', [5] 
      ]);
    }).toThrow(new Error('Left Stack popped value is not a number: (string) "5"'));
  });

  it('throws error if second num is not a number', function () {
    expect(function () {
      iii.run([
        5, 'less or equal', ["6"] 
      ]);
    }).toThrow(new Error('Argument Stack shifted value is not a number: (string) "6"'));
  });

});
// === describe less or equal =======================================

// ==================================================================
describe("bigger or equal", function () {
  it('it places true if: 6 >= 4', function () {
    var o = iii.run([
      6, "bigger or equal", [ 4 ]
    ]);
    expect(o.stack).toEqual([true]);
  });

  it('it places true if: 6 >= 6', function () {
    var o = iii.run([
      6, "bigger or equal", [ 6 ]
    ]);
    expect(o.stack).toEqual([true]);
  });

  it('it places false if: 6 >= 7', function () {
    var o = iii.run([
      6, "bigger or equal", [ 7 ]
    ]);
    expect(o.stack).toEqual([false]);
  });

  it('throws error if first num is not a number', function () {
    expect(function () {
      iii.run([ '3', 'bigger or equal', [5] ]);
    }).toThrow(new Error('Left Stack popped value is not a number: (string) "3"'));
  });

  it('throws error if second num is not a number', function () {
    expect(function () {
      iii.run([ 5, 'bigger or equal', ["9"] ]);
    }).toThrow(new Error('Argument Stack shifted value is not a number: (string) "9"'));
  });
});
// === describe bigger or equal =====================================


// ==================================================================
describe('bigger', function () {

  it('it places true on stack if: 6 > 1', function () {
    var o = iii.run([ 6, 'bigger', [1] ]);
    expect(o.stack).toEqual([true]);
  });


  it('it places false on stack if: 6 > 6', function () {
    var o = iii.run([ 6, 'bigger', [6] ]);
    expect(o.stack).toEqual([false]);
  });

});
// === describe bigger ==============================================

// ==================================================================
describe('less', function () {

  it('it places true on stack if: 1 < 6', function () {
    var o = iii.run([
      1, 'less', [6]
    ]);
    expect(o.stack).toEqual([true]);
  });


  it('it places false on stack if: 6 < 6', function () {
    var o = iii.run([
      6, 'less', [6]
    ]);
    expect(o.stack).toEqual([false]);
  });

  it('it places false on stack if: 6 < 1', function () {
    var o = iii.run([
      6, 'less', [1]
    ]);
    expect(o.stack).toEqual([false]);
  });

});
// === describe less ================================================


// ==================================================================
describe('equal', function () {

  it('it places true on stack if: 1 === 1', function () {
    var o = iii.run([
      1, 'equal', [1]
    ]);
    expect(o.stack).toEqual([true]);
  });

  it('it places true on stack if: \'a\' === \'a\'', function () {
    var o = iii.run([
      "a", 'equal', ["a"]
    ]);
    expect(o.stack).toEqual([true]);
  });

  it('throws Error if type mis-match: \'5\' === 5', function () {
    expect(function () {
      iii.run([ "5", 'equal', [5] ]);
    }).toThrow(new Error('Type mis-match: (string) "5" !== (number) "5"' ));
  });

});
// === describe equal ===============================================


// ==================================================================
describe('and', function () {

  it('throws error if last value on stack is not a bool', function () {
    expect(function () {
      iii.run([ 1, 'and', [1, 'equal', [1]] ]);
    }).toThrow(new Error('Left Stack popped value is not a boolean: (number) "1"'));
  });

  it('throws if last value of args is not a bool', function () {
    expect(function () {
      iii.run([ true, 'and', [2] ]);
    }).toThrow(new Error('Argument Stack shifted value is not a boolean: (number) "2"'));
  });

  it('it places true on stack if both conditions are true', function () {
    var o = iii.run([
      true, 'and', [6, 'equal', [6]]
    ]);
    expect(o.stack).toEqual([true]);
  });

  it('does not evaluate args if left stack value is false', function () {
    var o = iii.run([
      false, 'and', ['unknown method', []]
    ]);
    expect(o.stack).toEqual([false]);
  });

});
// === describe and =================================================

// ==================================================================
describe('or:', function () {

  it('it throws an error if first condition is not a bool', function () {
    expect(function () {
      iii.run(["something", 'or', [false]]);
    }).toThrow(new Error('Left Stack popped value is not a boolean: (string) "something"'));
  });

  it('it throws an error if second condition is not a bool', function () {
    expect(function () {
      iii.run([false, 'or', ["something"]]);
    }).toThrow(new Error('Argument Stack shifted value is not a boolean: (string) "something"'));
  });

  it('it places true on stack if both conditions are true', function () {
    var o = iii.run([
      true, 'or', [6, 'equal', [6]]
    ]);
    expect(o.stack).toEqual([true]);
  });

  it('it places true on stack if: false or true', function () {
    var o = iii.run([
      false, 'or', [6, 'equal', [6]]
    ]);
    expect(o.stack).toEqual([true]);
  });

  it('does not evaluate args if first condition is true', function () {
    var o = iii.run([
      true, 'or', ['no known method', []]
    ]);
    expect(o.stack).toEqual([true]);
  });

});
// === describe or ==================================================


// ==================================================================
describe('if true:', function () {

  it('throws an error if righ hand value is not a bool', function () {
    expect(function () {
      iii.run([
        6, "if true", [5]
      ]);
    }).toThrow(new Error('Left Stack popped value is not a boolean: (number) "6"'));
  });

  it('does not place result on stack if left stack value is true', function () {
    var o = iii.run([
      true, "if true", [ 100, 5]
    ]);

    expect(o.stack).toEqual([true]);
  });

  it('does not place result on stack if left stack value is false', function () {
    var o = iii.run([
      false, "if true", [ 100, 5]
    ]);

    expect(o.stack).toEqual([false]);
  });

  it('does not run tokens if stack value is false', function () {
    var o = iii.run([
      false, "if true", [ "something unknown", [] ]
    ]);

    expect(o.stack).toEqual([false]);
  });

});
// === describe if true =============================================


// ==================================================================
describe('if false', function () {
  it('throws an error if left stack value is not a bool', function () {
    expect(function () {
      iii.run([ 7, "if false", [5] ]);
    }).toThrow(new Error('Left Stack popped value is not a boolean: (number) "7"'));
  });

  it('does not place result value on stack if left stack value is true', function () {
    var o = iii.run([
      true, "if false", [ 100, 5 ]
    ]);

    expect(o.stack).toEqual([true]);
  });

  it('does not place result value on stack if left stack value is false', function () {
    var o = iii.run([
      true, "if false", [ 100, 5 ]
    ]);

    expect(o.stack).toEqual([true]);
  });

  it('does not run tokens if stack value is true', function () {
    var o = iii.run([
      true, "if false", [ "something unknown", [] ]
    ]);

    expect(o.stack).toEqual([true]);
  });
});
// === describe if false ============================================




 
 
 
 
 
 
 
