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
    } catch (err) {
      // @ts-ignore
      console.log("GETTING ITEM", err.message);
    }
    // TRYING TO INCRESE/DECRESE COUNT ON NON EXISTING PRODUCT SHOULD RESULT IN ERROR
    try {
      cartCook.increaseItemCount(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("INCREASING COUNT", err.message);
    }
    try {
      cartCook.decreaseItemCount(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("DECREASING COUNT", err.message);
    }
    // TRYING TO INCRESE/DECREASE COUNT FOR NON EXISTING ITEM SHOULD RESULT IN ERROR
    try {
      cartCook.addToCart({
        id: cuid() + 3,
        count: 1,
        name: "some",
        price: 666,
      });

      cartCook.increaseItemCount(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("INCREASING COUNT", err.message);
    }
    try {
      cartCook.decreaseItemCount(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("DECRE COUNT", err.message);
    }

    // TESTING ADDING TO CART AND GETTING FROM CART
    const item1Id = cuid();

    const item1 = cartCook.addToCart({
      id: item1Id,
      count: 6,
      name: "Blam",
      price: 666.6,
    });

    const sameItem1 = cartCook.getItem(item1Id);

    console.log("ONE", item1.id === sameItem1?.id);

    console.log("TWO", item1.id === item1Id);

    console.log("THREE", sameItem1?.id === item1Id);

    console.log({ item1, sameItem1 });

    // const id1 = cuid()

    // cartCookie.addToCart({id: id1, count: 6, name: "Product1", price: 666 })

    // --------------------------------------------------------
    // --------------------------------------------------------
  }, []);
};

export default useManualTest;
