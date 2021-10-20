export const PRODUCTS_PER_PAGE = 16;

export const NAV_HISTORY = "NAV_HISTORY";

const basePath = process.env.NEXTAUTH_URL as string;

export const authorizedPathsRoots = {
  profile: `${basePath}/profile/`,
  admin: `${basePath}/admin/`,
};
