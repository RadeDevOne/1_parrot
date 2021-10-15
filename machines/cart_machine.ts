import { createMachine, assign, interpret } from "xstate";

// TODO
// WE WILL ONLY PUT CART IN THE DATABASE WHEN
// USER AS A SIGNED IN USER PROCEEDES TO MAKE AN ORDER

// THEN IF HE DOESN'T MAKE PAYMENT WE WILL EXPIRE THINGS

// WE SHOULD HAVE SYSTEM (CORRECTION SCREEN) WHERE HE NEEDS TO LOWER
// COUNT OF PRODUCT IF THAT COUNT ISN'T AVAILABLE

/**
 * @description finite states enum
 */
export enum fse {
  idle = "idle",
  adding = "adding",
  removing = "removing",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  PLACEHOLDING_ONE = "PLACEHOLDING_ONE",
  PLACEHOLDING_TWO = "PLACEHOLDING_TWO",
  // events not depending on finite state
  CHECK_CURRENT_DARK_MODE = "CHECK_CURRENT_DARK_MODE",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  // isDarkMode: boolean;
  random: number;
}

export type machineEventsGenericType =
  | {
      type: EE.CHECK_CURRENT_DARK_MODE;
      payload: {
        isDark: boolean;
      };
    }
  | {
      type: EE.PLACEHOLDING_ONE;
      payload: {
        placeholder: number;
      };
    }
  | {
      type: EE.PLACEHOLDING_TWO;
      payload: {
        placeholder: string;
      };
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
    random: 2,
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
  },
});

export const mainService = interpret(cartMachinre);

mainService.onTransition((state, event) => {
  //
  // console.log({ ctx: state.context });
  console.log("TRANSITION");
});
