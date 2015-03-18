
describe("instruct_instruct_instruct", function () {

  it('runs the code', function () {
    var i = new instruct_instruct_instruct(
      [5, 'plus', [5]],
      {plus: function (iii) {
        return iii.pop_num() + iii.shift_num();
      }}
    );

    expect(i.stack).toBe([10]);
  }); // === it

}); // === describe
