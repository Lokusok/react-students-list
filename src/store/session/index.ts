import { makeAutoObservable, runInAction } from 'mobx';

import {
  TProfile,
  TUserLogin,
  TUserMainLogin,
  TUserRegister,
} from '@src/shared/types';

import ApiService from '@src/api';
import { AxiosError } from 'axios';
import { LocalStorageEnum } from '@src/shared/enums';

export class SessionStore {
  waiting: boolean = true;
  isWaitingRestore: boolean = false;
  isWaitingDelete: boolean = false;

  profile: TProfile | null = null;
  isRestoringPasswordInProcess: boolean = false;
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
   * Установить ошибку
   */
  setError(error: string) {
    this.error = error;
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
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.error);
      this.setError('Ошибка при регистрации');
    } finally {
      runInAction(() => {
        this.waiting = false;
      });
    }
  }

  /**
   * Синхронизация состояний, связанных с сбросом пароля с localStorage'ом
   */
  syncResetPasswordStatesWithLocalStorage() {
    const alreadyProcessingEmails = JSON.parse(
      localStorage.getItem(LocalStorageEnum.PASSWORD_RESTORE_PROCESS) || '[]'
    );

    this.isRestoringPasswordInProcess = alreadyProcessingEmails.includes(
      this.profile?.login
    );
  }

  /**
   * Добавить в localStorage новый процессируемый email
   */
  syncAddToLocalStorageProcessingResetPasswordEmail(email: string) {
    const alreadyProcessingEmails = JSON.parse(
      localStorage.getItem(LocalStorageEnum.PASSWORD_RESTORE_PROCESS) || '[]'
    );

    alreadyProcessingEmails.push(email);
    localStorage.setItem(
      LocalStorageEnum.PASSWORD_RESTORE_PROCESS,
      JSON.stringify(alreadyProcessingEmails)
    );
  }

  /**
   * Удалить email из localStorage
   */
  syncRemoveFromLocalStorageProcessingResetPasswordEmail(email: string) {
    const alreadyProcessingEmails: string[] = JSON.parse(
      localStorage.getItem(LocalStorageEnum.PASSWORD_RESTORE_PROCESS) || '[]'
    );
    const newEmails = alreadyProcessingEmails.filter((e) => e !== email);

    localStorage.setItem(
      LocalStorageEnum.PASSWORD_RESTORE_PROCESS,
      JSON.stringify(newEmails)
    );
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
      this.syncResetPasswordStatesWithLocalStorage();
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.error);
      this.setError('Ошибка при входе');
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
      this.syncResetPasswordStatesWithLocalStorage();
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.error);
      this.setError('Ошибка при аутентификации');
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
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.message);
      this.setError('Ошибка при изменении');
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
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.error);
      this.setError('Ошибка при подтверждении пользователя');
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
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.message);
      this.setError('Ошибка при подтверждении пароля');
    }
  }

  /**
   * Удалить пользователя
   */
  async deleteUser() {
    this.isWaitingDelete = true;

    try {
      await ApiService.deleteUser(this.profile!.id);
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data.message);
      this.setError('Ошибка при удалении пользователя');
    } finally {
      runInAction(() => {
        this.isWaitingDelete = false;
      });
    }
  }

  /**
   * Начать процесс сброса пароля
   */
  async startRestorePassword(email: string) {
    this.isWaitingRestore = true;

    this.syncAddToLocalStorageProcessingResetPasswordEmail(email);

    this.isRestoringPasswordInProcess = true;

    try {
      await ApiService.startRestorePassword(email);
      this.resetErrors();
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data?.error);
      this.setError('Ошибка при попытке сбросить пароль...');
    } finally {
      runInAction(() => {
        this.isWaitingRestore = false;
      });
    }
  }

  /**
   * Сбросить пароль
   */
  async resetPassword(data: TUserMainLogin) {
    this.isWaitingRestore = true;

    await new Promise((res) => setTimeout(res, 5000));

    try {
      await ApiService.resetPassword(data);
      this.resetErrors();
      this.syncRemoveFromLocalStorageProcessingResetPasswordEmail(data.login);
    } catch (err) {
      if (err instanceof AxiosError)
        return this.setError(err.response?.data?.error);
      this.setError('Ошибка при попытке сбросить пароль...');
    } finally {
      runInAction(() => {
        this.isWaitingRestore = false;
      });
    }
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
