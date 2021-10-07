import apiClient from "../../../lib/testing/apiClient";
import handler from "../../../pages/api/EXAMPLE/[bar]";

describe("We are testing dynamic route /api/EXAMPLE/[bar]", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameter = "bologna";

    const result = await apiClient(handler, queryParameter).get(
      `/api/EXAMPLE/${queryParameter}`
    );

    //
    console.log({ result });

    expect(result.status).toEqual(200);
  });
});
