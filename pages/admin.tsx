/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { NextPage as NP } from "next";

import { signOut } from "next-auth/react";

import Button from "@/components/buttons/Button";

const AdminPage: NP = () => {
  return (
    <Button
      outlined
      onClick={() => {
        signOut({ callbackUrl: "http://localhost:3000/" });
      }}
      variant="secondary"
    >
      Sign Out
    </Button>
  );
};

export default AdminPage;
