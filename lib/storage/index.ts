import cook from "js-cookie";
import { CART } from "@/constants/cart";

// TYPES

interface CartItemI {
  id: string;
  name: string;
  price: number;
  count: number;
}

/**
 * @description key (string) IS id OF PRODUCT
 */
type CartType = Record<string, CartItemI>;

// ---- UTILITIES ---------------------------------------------
// ------------------------------------------------------------
//
const checkIfcartExistsAndCreateItIfDoesnt = () => {
  let cartString: string | undefined;

  cartString = cook.get(CART);

  if (!cartString) {
    cartString = cook.set(CART, JSON.stringify({}));
  }

  if (!cartString) {
    throw new Error(
      "Something is wrong with the checking if cart exists and creating it if doesn't"
    );
  }

  return JSON.parse(cartString) as CartType;
};
const parseCart = (cartString: string) => {
  const cartObjct = JSON.parse(cartString);

  return cartObjct as CartType;
};
//
// ------------------------------------------------------------
// ------------------------------------------------------------
const calculateTotalPrice = () => {
  const cart = checkIfcartExistsAndCreateItIfDoesnt();

  let total: number = 0;

  for (const key in cart) {
    total += cart[key].count * cart[key].price;
  }

  return total;
};
// ------------------------------------------------------------
// ------------------------------------------------------------
//
// "CRUD" TO THE COOKIE
export const addToCart = (item: CartItemI) => {
  checkIfcartExistsAndCreateItIfDoesnt();

  // CHECK IF INPUUT ALREADY EXISTS (TROW ERROR IF DOES)
  const cartString = cook.get(CART);

  const cart = parseCart(cartString || ""); //   || won't happen ever (just for typescript purposes)

  if (cart[item.id]) {
    throw new Error("Item with that id already exists in cart");
  }

  const { id, name, count, price } = item;

  cart[item.id] = {
    id,
    name,
    count,
    price,
  };

  const newItem = cook.set(CART, cart);

  if (!newItem) {
    throw new Error("Couldn't set up item to the cart for some reason!");
  }

  return cart[item.id];
};

export const removeFromCart = (id: string) => {
  // IF THERE IS NO CART , WE SHOULD THROW ERROR

  const cartString = cook.get(CART);

  if (!cartString) {
    throw new Error("You are trying to remove item but cart doesn't exist!");
  }

  const cart = parseCart(cartString);
  // WE NEED CONFIRMATION HERE, THAT ITEM ACTUALLY EXISTED

  const possibleItem = cart[id];

  if (!possibleItem) {
    throw new Error("Item you are trying to remove is not in the cart!");
  }

  delete cart[id];

  cook.set(CART, cart);

  return id;
};

export const eraseCart = () => {
  // GETTING CART
  const cartString = cook.get(CART);

  if (!cartString) {
    throw new Error("Can't remove car if cart doen't exit in the first place!");
  }

  cook.set(CART, JSON.stringify({}));

  return JSON.parse(cartString);
};

export const increaseItemCount = (id: string) => {
  //
};

export const decreaseItemCount = (id: string) => {
  //
};

export const getCart = () => {
  const cartString = cook.get(CART);

  if (!cartString) {
    return null;
  }

  return parseCart(cartString);
};

// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------

const crud = {
  addToCart,
  removeFromCart,
  eraseCart,
  increaseItemCount,
  decreaseItemCount,
  calculateTotalPrice,
  getCart,
};

export default crud;
