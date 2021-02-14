import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState } from "../initialState";

/*
   ---------------------- Mutations this is your code----------------------------
 */

export type MutationPayload = {
  changeUserName: string;
};

export const mutations: MutationTree<State> & Mutations = {
  changeUserName({ auth }, newUserName) {
    auth.name = newUserName;
  },
};

/*
   ---------------------- Getters -------------------------------
 */

export type Getters = {
  userGet(
    state: State
  ): {
    name: string;
    idUser: string;
    email: string;
  };
};

export const getters: GetterTree<State, State> & Getters = {
  userGet: ({ auth }) => {
    return auth;
  },
};

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  setUserAction: [payload: string, returnVal: void];
};

export const actions: Actions = {
  setUserAction({ commit }, payload) {
    commit("changeUserName", payload);
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
