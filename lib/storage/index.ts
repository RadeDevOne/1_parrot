import cook from "js-cookie";
import { CART } from "@/constants/cart";

// TYPES

export interface CartItemI {
  id: string;
  name: string;
  price: number;
  count: number;
  image: string;
  countInStock: number;
}

/**
 * @description key (string) IS id OF PRODUCT
 */
export type CartType = Record<string, CartItemI>;

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

//
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
const addToCart = (item: CartItemI) => {
  checkIfcartExistsAndCreateItIfDoesnt();

  // CHECK IF INPUUT ALREADY EXISTS (TROW ERROR IF DOES)
  const cartString = cook.get(CART);

  const cart = parseCart(cartString || ""); //   || won't happen ever (just for typescript purposes)

  if (cart[item.id]) {
    throw new Error("Item with that id already exists in cart");
  }

  const { id, name, count, price, image, countInStock } = item;

  cart[item.id] = {
    id,
    name,
    count,
    price,
    image,
    countInStock,
  };
  // DON'T FORGET TO STRINGIFY
  const newItem = cook.set(CART, JSON.stringify(cart));

  if (!newItem) {
    throw new Error("Couldn't set up item to the cart for some reason!");
  }

  return cart[item.id];
};

const removeFromCart = (id: string) => {
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
  // DON'T FORGET TO STRINGIFY
  cook.set(CART, JSON.stringify(cart));

  return id;
};

const eraseCart = () => {
  // GETTING CART
  const cartString = cook.get(CART);

  if (!cartString) {
    throw new Error("Can't remove car if cart doen't exit in the first place!");
  }

  cook.set(CART, JSON.stringify({}));

  return JSON.parse(cartString);
};

const increaseItemCount = (id: string) => {
  //
  const cartString = cook.get(CART);

  if (!cartString) {
    throw new Error("There is no cart");
  }

  const cart = parseCart(cartString);

  const item = cart[id];

  if (!item) {
    throw new Error("There is no item you want to increase");
  }

  item.count = item.count + 1;

  cart[id] = item;

  cook.set(CART, JSON.stringify(cart));

  return cart;
};

const decreaseItemCount = (id: string) => {
  //
  const cartString = cook.get(CART);

  if (!cartString) {
    throw new Error("There is no cart");
  }

  const cart = parseCart(cartString);

  const item = cart[id];

  if (!item) {
    throw new Error("There is no item you want to decrease");
  }

  item.count = item.count - 1;

  cart[id] = item;

  cook.set(CART, JSON.stringify(cart));

  return cart;
};

const getCart = () => {
  const cartString = cook.get(CART);

  if (!cartString) {
    return null;
  }

  return parseCart(cartString);
};

const getItem = (id: string) => {
  const cartString = cook.get(CART);

  if (!cartString) {
    throw new Error("There is no cart");
  }

  const cart = parseCart(cartString);

  const item = cart[id];

  return item as typeof item | undefined;
};

// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// WHEN MACHINE MOUNTS, WHEN OUR APP MOUNTS
// WE SHOULD GET CART AND ADD IT AS A CONTEXTUAL STATE IN THE MACHINE
/**
 *
 * @returns cart
 * @description getting cart (use this when you mount app), should call this
 * inside the machine when some event anounces that cart component is mounted
 */
const establishCartOnMounting = () => {
  //
  const cart = getCart();
  //
  if (cart) {
    return cart;
  }

  cook.set(CART, JSON.stringify({}));

  return {};
};
// ------------------------------------------------------------
// ------------------------------------------------------------
// WE SHOULD DEFINE THAT EVERY "CRUD"
// FUNCTION, AT ITS END, GETS CART
// AND THEN RETURN THAT CART
/**
 *
 * @param item cart item data
 * @returns cart
 * @description adding one product whith the count and rest of the stuff
 */
const add = (item: CartItemI) => {
  addToCart(item);

  return getCart() as CartType;
};
/**
 *
 * @param id string (product id)
 * @returns cart
 * @description removes specified product from the cart (entire product with all count)
 */
const remove = (id: string) => {
  removeFromCart(id);

  return getCart() as CartType;
};
/**
 *
 * @param id string (product id)
 * @returns cart
 * @description increases count by one for the specified product
 */
const increase = (id: string) => {
  increaseItemCount(id);
  return getCart() as CartType;
};
/**
 *
 * @param id string (product id)
 * @returns cart
 * @description decreases count of single product by one
 */
const decrease = (id: string) => {
  decreaseItemCount(id);
  return getCart() as CartType;
};
/**
 *
 * @returns empty cart
 * @description erases all items from the cart
 */
const erase = () => {
  eraseCart();
  return getCart() as CartType;
};

/**
 * @description info: first time adding to cart creates CART cookie
 */
const crud = {
  addToCart,
  removeFromCart,
  eraseCart,
  increaseItemCount,
  decreaseItemCount,
  calculateTotalPrice,
  getCart,
  getItem,
  // THESE FUNCTIONS WE ARE GOING TO USE INSIDE MACHINE
  method: {
    add,
    remove,
    increase,
    decrease,
    erase,
    establishCartOnMounting,
    calculateTotalPrice,
  },
};

export default crud;
