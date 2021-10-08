// INSREAD OF THIS WE USED EARLIER
// import { testClient } from "../../../lib/testing/apiClient";
// WE USE THIS
import { buildDynamicClient } from "../../../lib/testing/buildDynamicApiClient";

import handler from "../../../pages/api/EXAMPLE/[bar]";

describe("We are testing dynamic route /api/EXAMPLE/[bar]", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameterValue = "bologna";

    // INSTEAD OF THIS
    /* const result = await testClient(handler, "bar", queryParameterValue).get(
      `/api/EXAMPLE/${queryParameterValue}`
    ); */

    // WE BUILT A CLIENT WITH ROUTE ORIGINAL NAME (WITH [])
    // AND WITH handler
    const client = buildDynamicClient("/api/EXAMPLE/[bar]", handler);

    // WE MAKE THE REQUEST, AND YOU PASS A METHONG TOO
    const result = await client(queryParameterValue, "get");

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("baz");

    expect(result.body.baz).toEqual("hello 666 bologna");
  });
});
