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
    const item1Count = 6;

    const item1 = cartCook.addToCart({
      id: item1Id,
      count: item1Count,
      name: "Blam",
      price: 666.6,
    });

    const sameItem1 = cartCook.getItem(item1Id);

    console.log("ONE", item1.id === sameItem1?.id);

    console.log("TWO", item1.id === item1Id);

    console.log("THREE", sameItem1?.id === item1Id);

    console.log({ item1, sameItem1 });

    // TESTING INCREASING THE COUNT
    cartCook.increaseItemCount(item1.id);

    // SHOULD BE 7 NOW
    const sameItemThird = cartCook.getItem(item1.id);
    console.log("SHOULD BE 7", sameItemThird?.count === 7);

    cartCook.decreaseItemCount(item1.id);
    // SHOULD BE 6 now
    const sameItemFour = cartCook.getItem(item1.id);

    console.log("SHOULD BE 6 AGAIN", sameItemFour?.count === 6);

    // CREATING ONE ITEM SHOULD'T ERASE OTHER ITEM
    const newItem2Id = cuid();
    const newItem3Id = cuid();

    const newItem2 = cartCook.addToCart({
      id: newItem2Id,
      count: 3,
      name: "foo",
      price: 69,
    });

    const newItem3 = cartCook.addToCart({
      id: newItem3Id,
      count: 4,
      name: "bar",
      price: 126,
    });

    const newItem2Again = cartCook.getItem(newItem2Id);
    const newItem3Again = cartCook.getItem(newItem3Id);

    console.log("ITEM EXISTS", newItem2Again?.name === "foo");
    console.log("ITEM EXISTS", newItem3Again?.name === "bar");

    // GETTING THE CART
    const cart = cartCook.getCart();

    console.log({ cart });

    // CART SHOULD HAVE THREE ITEMS NOW
    const keys = Object.keys(cart || {});

    console.log("SHOULD HAVE THREE KEYS", keys.length === 3);

    // ERASING CART
    cartCook.eraseCart();

    const cartAgain = cartCook.getCart();

    console.log({ cartAgain });

    const keysAgain = Object.keys(cartAgain || {});

    console.log("ZERO ITEMS", keysAgain.length === 0);

    // --------------------------------------------------------
    // --------------------------------------------------------
  }, []);
};

export default useManualTest;
