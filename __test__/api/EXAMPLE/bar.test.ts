import apiClient from "../../../lib/testing/apiClient";
import handler from "../../../pages/api/EXAMPLE/[bar]";

describe("We are testing dynamic route /api/EXAMPLE/[bar]", () => {
  it("returns 200 if everything is ok", async () => {
    // THIS IS A BIT PROBLEMATIC TO MEMORIZE
    // WE USE THIS VARIABLE HERE
    const queryParameterValue = "bologna";

    // SO WE CAN PASS IT HERE
    const result = await apiClient(handler, "bar", queryParameterValue).get(
      // AND ALSO SO WE CAN PASS IT HERE
      `/api/EXAMPLE/${queryParameterValue}`
    );

    // console.log(result);

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("baz");

    expect(result.body.baz).toEqual("hello 666 bologna");
  });
});
