import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  header_visible = "header_visible",
  cart_visible = "cart_viible",
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
      value: fse.cart_visible;
      context: MachineContextGenericI;
    }
  | {
      value: fse.header_visible;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const mainMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "main_machine",
  initial: fse.header_visible,
  context: {
    random: 666,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  on: {
    /* [EE.CHECK_CURRENT_DARK_MODE]: {
      actions: [
        assign((ctx, event) => {

          return {random:  2}
          
        }),
      ],
    }, */
  },
  // -------------------------------------------------------------------
  states: {
    [fse.header_visible]: {},
    [fse.cart_visible]: {},
  },
});

export const mainService = interpret(mainMachine);

mainService.onTransition((state, event) => {
  //
  console.log({ isDarkMode: state.context.random });
  console.log("TRANSITION");
});
