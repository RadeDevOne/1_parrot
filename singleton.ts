import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";
import { DeepMockProxy } from "jest-mock-extended/lib/cjs/Mock";

import prisma from "./prisma_client_for_test";

// HEE WE NEED PATH TO OUR PRISMA CLIENT
// BECAUSE WE ARE MOCKING IT
jest.mock("./lib/prisma/index.ts", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
