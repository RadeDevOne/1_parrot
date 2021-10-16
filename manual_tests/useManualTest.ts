/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect, useState } from "react";
import cuid from "cuid";

import cartCook from "@/lib/storage";

const useManualTest = () => {
  useEffect(() => {
    // ------- TESTING CART FUNCTIONS  ------------------------
    // --------------------------------------------------------

    try {
      // TESTING ERRORS FIRST
      // GETTING NON ITEM WITHOUT THE EXISTING CART
      cartCook.getItem(cuid());
    } catch (err) {}

    // const id1 = cuid()

    // cartCookie.addToCart({id: id1, count: 6, name: "Product1", price: 666 })

    // --------------------------------------------------------
    // --------------------------------------------------------
  }, []);
};

export default useManualTest;
