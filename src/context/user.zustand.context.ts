import {create} from 'zustand';

type State = {
  email?: string;
  name?: string;
  id?: string;
};

type Actions = {
  dispatch: (qty: State) => void;
};

export const useStoreUser = create<State & Actions>(set => ({
  name: '',
  email: '',
  id: '',
  dispatch: (qty: State) => set(state => ({...state, ...qty})),
}));
