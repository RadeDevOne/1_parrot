import pagCalc from "../pagCalc";

describe("pagCalc", () => {
  it("should do the thing", () => {
    const result = pagCalc(0, 60);
    const result2 = pagCalc(1, 60);

    const result1 = pagCalc(59, 60);
    const result3 = pagCalc(58, 60);

    const result4 = pagCalc(57, 60);
    const result5 = pagCalc(56, 60);
    const result6 = pagCalc(55, 60);
    const result7 = pagCalc(2, 60);
    const result8 = pagCalc(3, 60);
    const result9 = pagCalc(4, 60);

    console.log(result);
    console.log(result1);

    console.log(result2);
    console.log(result3);
    console.log(result4);
    console.log(result5);
    console.log(result6);
    console.log(result7);
    console.log(result8);
    console.log(result9);
  });
});
