import parseDynamicRoute from "../parseDynamicRoute";

describe("helper test", () => {
  it("shuld be fine", () => {
    parseDynamicRoute("/api/something/[foo]", "balong");

    parseDynamicRoute("/api/[baz]/foo", "lelaza");
  });
});
