import buildDynamicRoute from "../buildDynamicRoute";

describe("building dynamic route for case of nextjs [] template", () => {
  it("shuld return valid route with value pssed in", () => {
    const result = buildDynamicRoute("/api/something/[foo]", "barbaz");

    const result2 = buildDynamicRoute("/api/[foo]/bam", "barbaz");

    expect(result).toEqual("/api/something/barbaz");

    expect(result2).toEqual("/api/barbaz/bam");

    // console.log({ result, result2 });

    expect(() => {
      buildDynamicRoute("/api/something/[foo", "barbaz");
    }).toThrowError();

    expect(() => {
      buildDynamicRoute("/api/[foo/bam", "barbaz");
    }).toThrowError();

    expect(() => {
      buildDynamicRoute("/api/something]/[foo", "barbaz");
    }).toThrowError();

    expect(() => {
      buildDynamicRoute("/api/foo]/bam", "barbaz");
    }).toThrowError();

    expect(() => {
      buildDynamicRoute("/api/foo/bam", "barbaz");
    }).toThrowError();
  });
});
