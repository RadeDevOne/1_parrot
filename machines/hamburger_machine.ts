import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  open = "open",
  closed = "closed",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  // events not depending on finite state
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  hamburgerOpened: boolean;
}

export type machineEventsGenericType =
  | {
      type: EE.OPEN;
    }
  | {
      type: EE.CLOSE;
    };

export type machineFiniteStatesGenericType =
  | {
      value: fse.open;
      context: MachineContextGenericI;
    }
  | {
      value: fse.closed;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const hamburgerMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "main_machine",
  initial: fse.closed,
  context: {
    hamburgerOpened: false,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  /* on: {
    [EE.CHECK_CURRENT_DARK_MODE]: {
      actions: [
        assign((ctx, event) => {
          const { isDark } = event.payload;

          return {
            isDarkMode: isDark,
          };
        }),
      ],
    },
  }, */
  // -------------------------------------------------------------------
  states: {
    [fse.open]: {},
    [fse.closed]: {},
  },
});

export const hamburgerService = interpret(hamburgerMachine);

hamburgerService.onTransition((state, event) => {
  //
  console.log("TRANSITION");
});
