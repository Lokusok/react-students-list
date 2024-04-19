import { makeAutoObservable } from 'mobx';

import { TUserLogin, TUserRegister } from '@src/shared/types';

import ApiService from '@src/api';
import { AxiosError } from 'axios';

type TProfile = any; // @todo Описать нормальный тип

export class SessionStore {
  // waiting: boolean = true; @todo Это должно быть по умолчанию
  waiting: boolean = false;
  profile: TProfile | null = null;
  error: string = '';
  // profile: TProfile | null = {};

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Сбросить ошибки
   */
  resetErrors() {
    this.error = '';
  }

  /**
   * Регистрация пользователя
   */
  async registerUser(userData: TUserRegister) {
    this.waiting = true;

    try {
      const user = await ApiService.registerUser(userData);
      console.log('@', { user });
      this.resetErrors();
      this.profile = user;
    } catch (err) {
      console.log('Error here:', err);

      if (err instanceof AxiosError) {
        this.error = err.response?.data.error;
        console.log({ errorInState: this.error });
      }
    } finally {
      this.waiting = false;
    }
  }

  /**
   * Логинизация пользователя
   */
  async loginUser(userData: TUserLogin) {
    this.waiting = true;

    try {
      const user = await ApiService.loginUser(userData);
      console.log('@', { user });
      this.resetErrors();
      this.profile = user;
    } catch (err) {
      console.log('Error here:', err);

      if (err instanceof AxiosError) {
        this.error = err.response?.data.error;
        console.log({ errorInState: this.error });
      }
    } finally {
      this.waiting = false;
    }
  }

  /**
   * Аутентификация пользователя
   */
  async remind() {
    this.waiting = true;

    try {
      const user = await ApiService.remind();
      console.log('Remind user:', user);
      this.resetErrors();
      this.profile = user;
    } catch (err) {
      if (err instanceof AxiosError) {
        this.error = err.response?.data.error;
        console.log({ errorInState: this.error });
      }
    } finally {
      this.waiting = false;
    }
  }

  /**
   * Выход из аккаунта
   */
  async logout() {
    this.waiting = true;

    try {
      await ApiService.logout();
      this.profile = null;
    } catch (err) {
      if (err instanceof AxiosError) {
        this.error = err.response?.data.error;
      }
    } finally {
      this.waiting = false;
    }
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
