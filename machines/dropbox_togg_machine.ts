import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  closed = "closed",
  open = "open",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  TOGGLE = "TOGGLE",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  visible: boolean;
}

export type machineEventsGenericType = {
  type: EE.TOGGLE;
  payload: {
    isDark: boolean;
  };
};

export type machineFiniteStatesGenericType =
  | {
      value: fse.closed;
      context: MachineContextGenericI;
    }
  | {
      value: fse.open;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const dropboxToggMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "main_machine",
  initial: fse.closed,
  context: {
    visible: false,
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
    },
    */
  },
  // -------------------------------------------------------------------
  states: {
    [fse.closed]: {
      entry: [
        assign({
          visible: (_, __) => {
            return false;
          },
        }),
      ],
      on: {
        [EE.TOGGLE]: {
          target: fse.open,
        },
      },
    },
    [fse.open]: {
      entry: [
        assign({
          visible: (_, __) => {
            return true;
          },
        }),
      ],
      on: {
        [EE.TOGGLE]: {
          target: fse.closed,
        },
      },
    },
  },
});

export const dropboxToggService = interpret(dropboxToggMachine);

dropboxToggService.onTransition((state, event) => {
  //
  // console.log({ ctx: state.context });
  console.log("TRANSITION");
});
