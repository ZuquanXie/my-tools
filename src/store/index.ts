import { createStore, Store, StoreOptions } from "vuex";
import { InjectionKey } from "vue";

type RootState = {
  mark?: string;
};

const storeOptions: StoreOptions<RootState> = {
  state: {},
};

export const storeKey: InjectionKey<Store<RootState>> = Symbol();
export const store = createStore(storeOptions);
