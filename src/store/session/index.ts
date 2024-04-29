import { makeAutoObservable, runInAction } from 'mobx';

import { TProfile, TUserLogin, TUserRegister } from '@src/shared/types';

import ApiService from '@src/api';
import { AxiosError } from 'axios';

export class SessionStore {
  waiting: boolean = true;
  isWaitingDelete: boolean = false;

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
      await ApiService.registerUser(userData);
      this.resetErrors();
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
      runInAction(() => {
        this.profile = user;
      });
      this.resetErrors();
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
      runInAction(() => {
        this.profile = user;
      });
      this.resetErrors();
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

    // 100% должны разлогинить пользователя
    try {
      await ApiService.logout();
      this.resetErrors();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      runInAction(() => {
        this.profile = null;
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
      this.resetErrors();
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

  /**
   * Сделать пользователя подтверждённым
   */
  async makeAllowedUser(userId: string) {
    try {
      await ApiService.allowUser(userId);
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.error;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при подтверждении пользователя';
      });
    }
  }

  /**
   * Подтверждение пароля
   */
  async confirmPassword(password: string) {
    try {
      await ApiService.confirmPassword(this.profile!.id, password);
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.message;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при подтверждении пароля';
      });
    }
  }

  /**
   * Удалить пользователя
   */
  async deleteUser() {
    this.isWaitingDelete = true;

    await new Promise((res) => setTimeout(res, 3000));

    try {
      await ApiService.deleteUser(this.profile!.id);
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError) {
        return runInAction(() => {
          this.error = err.response?.data.message;
        });
      }

      runInAction(() => {
        this.error = 'Ошибка при удалении пользователя';
      });
    } finally {
      runInAction(() => {
        this.isWaitingDelete = false;
      });
    }
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
