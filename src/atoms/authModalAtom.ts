import { atom } from 'recoil';

export type view = 'logIn' | 'signUp' | 'resetPassword';

export interface IAuthModalState {
  isOpen: boolean;
  view: view;
}

const defaultModalState: IAuthModalState = {
  isOpen: false,
  view: 'logIn',
};

export const AuthModalState = atom<IAuthModalState>({
  key: 'AuthModalState',
  default: defaultModalState,
});
