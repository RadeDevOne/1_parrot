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

/**
 * @description finite states enum
 */
export enum fse {
  //
  idle = "idle",
  // ADDING ONE PRODUCT (WITH A COUNT)
  adding = "adding",
  // REMOVING ONE ITEM (OR REMOVING ENTIRE COUNT OF THE PRODUCT)
  removing = "removing",
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
  ERASE = "ERASE",
  CHECK = "CHECK",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  cartIsEmpty: true;
}

export type machineEventsGenericType =
  | {
      type: EE.ADD;
      payload: {
        //
      };
    }
  | {
      type: EE.REMOVE;
      payload: {
        //
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
    };

// -----------------  MACHINE --------------------

const cartMachinre = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "main_machine",
  initial: fse.idle,
  context: {
    cartIsEmpty: true,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  on: {
    /* [EE.CHECK_CURRENT_DARK_MODE]: {
      actions: [
        assign((ctx, event) => {
          const { isDark } = event.payload;

          return {
            isDarkMode: isDark,
          };
        }),
      ],
    }, */
  },
  // -------------------------------------------------------------------
  states: {
    [fse.idle]: {},
    [fse.adding]: {},
    [fse.removing]: {},
    [fse.erasing]: {},
    [fse.checking]: {},
  },
});

export const mainService = interpret(cartMachinre);

mainService.onTransition((state, event) => {
  //
  // console.log({ ctx: state.context });
  console.log("TRANSITION");
});
