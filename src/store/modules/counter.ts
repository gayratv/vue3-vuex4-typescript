import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState } from "../initialState";

/*
   ---------------------- Mutations -------------------------------
 */

export type MutationPayload = {
  setOne: void;
  setAdd: number;
  setMulti: { addCnt1: number; addCnt2: number };
};

export const mutations: MutationTree<State> & Mutations = {
  setOne({ counter }) {
    counter.counter = 0;
  },
  setAdd({ counter }, payload) {
    counter.counter += payload;
  },
  setMulti({ counter }, payload) {
    counter.counter += payload.addCnt1 + payload.addCnt2;
  },
};

/*
   ---------------------- Getters -------------------------------
 */

export type Getters = {
  doubledCounter(state: State): number;
  counterGet(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  doubledCounter: ({ counter }) => {
    return counter.counter * 2;
  },
  counterGet: ({ counter }) => {
    return counter.counter;
  },
};

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  setOneA: [payload: void, returnVal: void];
  setAddA: [payload: number, returnVal: number];
  setMultiA: [
    payload: { addCnt1: number; addCnt2: number },
    returnVal: Promise<number>
  ];
};

export const actions: Actions = {
  setOneA({ commit }): void {
    commit("setOne", (null as unknown) as void);
  },
  setAddA({ commit, state }, payload: number): number {
    commit("setAdd", payload);
    return state.counter.counter;
  },
  async setMultiA(
    con: AugmentedActionContext,
    payload: { addCnt1: number; addCnt2: number }
  ): Promise<number> {
    await setTimeout(() => {
      con.commit("setMulti", payload);
    }, 2000);

    return new Promise<number>(() => 1);
  },
};

/*
   ---------------------- Actions no change code -----------------------------
 */

type Actions = {
  [Property in keyof ActionsPayload]: (
    augContext: AugmentedActionContext,
    payload: ActionsPayload[Property][0]
  ) => ActionsPayload[Property][1];
};

type AugmentedActionContext = {
  commit<K extends keyof MutationPayload>(
    key: K,
    payload: MutationPayload[K],
    options?: CommitOptions
  ): void;
} & Omit<ActionContext<State, State>, "commit">;

/*
   ---------------------- Mutations - no change code ------------------------
 */

type Mutations = {
  [Property in keyof MutationPayload]: (
    state: State,
    payload: MutationPayload[Property]
  ) => void;
};

/*
   ---------------------- Getters - no change code -------------------------------
 */
type State = typeof initialState;
