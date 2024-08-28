import {create} from 'zustand';
import {IUser} from '../utils/interfaces/user';

type Actions = {
  dispatch: (qty: IUser) => void;
};

export const useStoreUser = create<IUser & Actions>(set => ({
  email: '',
  emailValidated: false,
  id: '',
  name: '',
  role: [''],
  dispatch: (qty: IUser) => set(state => ({...state, ...qty})),
}));
