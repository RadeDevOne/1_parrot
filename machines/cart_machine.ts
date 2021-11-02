import { createMachine, assign, interpret } from "xstate";

// ---- TODO ----
// WE WILL ONLY PUT CART IN THE DATABASE WHEN
// USER AS A SIGNED IN USER IS ALLOWED TO MAKE AN ORDER
// THEN IF HE DOESN'T MAKE PAYMENT WE WILL EXPIRE THINGS
// WE WILL HAVE EXPIRATION SYSTEM
// WE SHOULD HAVE SYSTEM (CORRECTION SCREEN) WHERE USER NEEDS TO LOWER
// COUNT OF PRODUCT IF EXACT COUNT ISN'T ANYMORE AVAILABLE

// SO THIS MACHINE IS NOT GOING TO USE REDIS (WE ARE NOT GOING TO
// SEND REQUESTS TO REDIS FROM FRONT END)

// WHEN CART MOUNTS IT SHOUD REFETCH ALREADY "CARTED" PRODUCTS TO CHECK
// THE COUNT AGAIN

//
import storageFuncs from "@/lib/storage";
import type { CartType, CartItemI } from "@/lib/storage";

const { method: crt } = storageFuncs;

/**
 * @description finite states enum
 */
export enum fse {
  //
  idle = "idle",
  // ADDING ONE PRODUCT (ADDING ITEM AND THE COUNT AND THE PRICE)
  adding = "adding",
  // REMOVING ONE ITEM (REMOVING ITEM AND THE COUNT AND THE PRICE)
  removing = "removing",
  // INCREASING COUNT OF THE ITEM BY ONE
  count_upping = "count_upping",
  // DECREASING COUNT OF THE ITEM BY ONE
  count_downing = "count_downing",
  // ERASING ENTIRE CART
  erasing = "erasing",
  // CHECKING CART (ON MOUNTING)
  checking = "checking",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  ADD = "ADD",
  REMOVE = "REMOVE",
  UP_COUNT = "UP_COUNT",
  DOWN_COUNT = "DOWN_COUNT",
  ERASE = "ERASE",
  CHECK = "CHECK",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  // cartIsEmpty: true;
  cart: CartType;
  totalPrice: number;
  lastAddedProduct: CartItemI | null;
}

export type machineEventsGenericType =
  | {
      type: EE.ADD;
      payload: {
        item: CartItemI;
      };
    }
  | {
      type: EE.REMOVE;
      payload: {
        prodId: string;
      };
    }
  | {
      type: EE.UP_COUNT;
      payload: {
        prodId: string;
      };
    }
  | {
      type: EE.DOWN_COUNT;
      payload: {
        prodId: string;
      };
    }
  | {
      type: EE.ERASE;
    }
  | {
      type: EE.CHECK;
    };

export type machineFiniteStatesGenericType =
  | {
      value: fse.idle;
      context: MachineContextGenericI;
    }
  | {
      value: fse.removing;
      context: MachineContextGenericI;
    }
  | {
      value: fse.adding;
      context: MachineContextGenericI;
    }
  | {
      value: fse.count_downing;
      context: MachineContextGenericI;
    }
  | {
      value: fse.count_upping;
      context: MachineContextGenericI;
    }
  | {
      value: fse.erasing;
      context: MachineContextGenericI;
    }
  | {
      value: fse.checking;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const cartMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>(
  {
    id: "main_machine",
    initial: fse.idle,
    context: {
      // cartIsEmpty: true,
      cart: {},
      totalPrice: 0,
      lastAddedProduct: null,
    },
    // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
    on: {
      /* [EE.]: {
      actions: [
        assign((ctx, event) => {
          // 
        }),
      ],
    }, */
    },
    // -------------------------------------------------------------------
    states: {
      [fse.idle]: {
        on: {
          [EE.CHECK]: {
            target: fse.checking,
          },
          [EE.ADD]: {
            target: fse.adding,
            actions: [
              assign({
                cart: (_, e) => {
                  return crt.add(e.payload.item);
                },
              }),
              assign({
                lastAddedProduct: (ctx, e) => {
                  return e.payload.item;
                },
              }),
            ],
          },
          [EE.REMOVE]: {
            target: fse.removing,
            actions: [
              assign({
                cart: (_, e) => {
                  return crt.remove(e.payload.prodId);
                },
              }),
            ],
          },
          [EE.UP_COUNT]: {
            target: fse.count_upping,
            actions: [
              assign({
                cart: (_, e) => {
                  return crt.increase(e.payload.prodId);
                },
              }),
            ],
          },
          [EE.DOWN_COUNT]: {
            target: fse.count_downing,
            actions: [
              assign({
                cart: (_, e) => {
                  return crt.decrease(e.payload.prodId);
                },
              }),
            ],
          },
          [EE.ERASE]: {
            target: fse.erasing,
          },
        },
      },
      [fse.checking]: {
        entry: [
          assign({
            cart: (_, __) => {
              return crt.establishCartOnMounting();
            },
          }),
          "calculateTotalPrice",
        ],
        always: {
          target: fse.idle,
        },
      },
      [fse.adding]: {
        always: {
          target: fse.idle,
        },
        entry: ["calculateTotalPrice"],
      },
      [fse.removing]: {
        always: {
          target: fse.idle,
        },
        entry: ["calculateTotalPrice"],
      },
      [fse.count_upping]: {
        always: {
          target: fse.idle,
        },
        entry: ["calculateTotalPrice"],
      },
      [fse.count_downing]: {
        always: {
          target: fse.idle,
        },
        entry: ["calculateTotalPrice"],
      },
      [fse.erasing]: {
        entry: [
          assign({
            cart: (_, e) => {
              return crt.erase();
            },
          }),

          "calculateTotalPrice",
        ],
      },
    },
  },
  {
    actions: {
      calculateTotalPrice: assign({
        totalPrice: (ctx, e) => {
          //
          //
          const totalPrice = crt.calculateTotalPrice();

          return totalPrice;
        },
      }),
    },
  }
);

export const cartService = interpret(cartMachine);

cartService.onTransition((state, event) => {
  //
  // console.log({ ctx: state.context });
  console.log("TRANSITION");
});
