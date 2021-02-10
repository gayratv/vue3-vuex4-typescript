import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger,
} from "vuex";

import { initialState } from "./initialState";

import * as moduleCounter from "./modules/counter";
import * as moduleAuth from "./modules/auth";

export type State = typeof initialState;

const plugins = [];
if (process.env.NODE_ENV === "development") {
  plugins.push(createLogger());
}

export const store = createStore({
  state: initialState,
  mutations: { ...moduleCounter.mutations, ...moduleAuth.mutations },
  getters: { ...moduleCounter.getters, ...moduleAuth.getters },
  actions: { ...moduleCounter.actions, ...moduleAuth.actions },
  plugins,
});

type MutationPayload = moduleCounter.MutationPayload &
  moduleAuth.MutationPayload;

type ActionsPayload = moduleCounter.ActionsPayload & moduleAuth.ActionsPayload;

type Getters = moduleCounter.Getters & moduleAuth.Getters;

/*
  ---------------------- no change code ----------------------
*/

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof MutationPayload>(
    key: K,
    payload: MutationPayload[K],
    options?: CommitOptions
  ): void;
} & {
  dispatch<K extends keyof ActionsPayload>(
    key: K,
    payload: ActionsPayload[K][0],
    options?: DispatchOptions
  ): ActionsPayload[K][1];
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export function useStore(): Store {
  return store as Store;
}
