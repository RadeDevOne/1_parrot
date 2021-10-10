import calcPagi from "../calcPagi";

describe("calculating pagination details", () => {
  it("should work properly", () => {
    const result = calcPagi(4, 16, 4, 70);
    const result1 = calcPagi(5, 16, 4, 70);
    const result2 = calcPagi(6, 16, 4, 70);

    // console.log({ result });
  });
});
