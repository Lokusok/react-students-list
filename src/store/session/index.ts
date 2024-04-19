import { makeAutoObservable, runInAction } from 'mobx';

import { TUserRegister } from '@src/shared/types';

import ApiService from '@src/api';
import { AxiosError } from 'axios';

type TProfile = any; // @todo Описать нормальный тип

export class SessionStore {
  // loading: boolean = true; @todo Это должно быть по умолчанию
  loading: boolean = false;
  profile: TProfile | null = null;
  error: string = '';
  // profile: TProfile | null = {};

  constructor() {
    makeAutoObservable(this);
  }

  async registerUser(userData: TUserRegister) {
    try {
      const user = await ApiService.registerUser(userData);
      console.log('@', { user });
      this.error = '';
    } catch (err) {
      console.log('Error here:', err);

      if (err instanceof AxiosError) {
        runInAction(() => {
          this.error = err.response?.data.error;
        });
        console.log({ errorInState: this.error });
      }
    }
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
