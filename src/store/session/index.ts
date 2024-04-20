import { makeAutoObservable, runInAction } from 'mobx';

import { TUserLogin, TUserRegister } from '@src/shared/types';

import ApiService from '@src/api';
import { AxiosError } from 'axios';

type TProfile = any; // @todo Описать нормальный тип

export class SessionStore {
  waiting: boolean = true;
  profile: TProfile | null = null;
  error: string = '';

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
      this.resetErrors();
      runInAction(() => {
        this.profile = user;
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        runInAction(() => {
          this.error = err.response?.data.error;
        });
      }
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
    }
  }

  /**
   * Логинизация пользователя
   */
  async loginUser(userData: TUserLogin) {
    this.waiting = true;

    try {
      const user = await ApiService.loginUser(userData);
      this.resetErrors();
      runInAction(() => {
        this.profile = user;
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        runInAction(() => {
          this.error = err.response?.data.error;
        });
      }
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
    }
  }

  /**
   * Аутентификация пользователя
   */
  async remind() {
    this.waiting = true;

    try {
      const user = await ApiService.remind();
      this.resetErrors();
      runInAction(() => {
        this.profile = user;
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        runInAction(() => {
          this.error = err.response?.data.error;
        });
      }
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
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
