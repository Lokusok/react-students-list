import { makeAutoObservable, runInAction } from 'mobx';

import { TProfile, TUserLogin, TUserRegister } from '@src/shared/types';

import ApiService from '@src/api';
import { AxiosError } from 'axios';

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
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при регистрации';
      });
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
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при входе';
      });
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
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при аутентификации';
      });
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
      runInAction(() => {
        this.profile = null;
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при выходе';
      });
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
    }
  }

  /**
   * Изменить информацию об аккаунте
   */
  async changeUserInfo(userInfo: FormData) {
    this.waiting = true;

    try {
      const profile = await ApiService.changeUserInfo(userInfo);
      runInAction(() => {
        this.profile = profile;
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.message;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при изменении';
      });
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
    }
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
