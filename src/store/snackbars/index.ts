import { makeAutoObservable } from 'mobx';

type TSnack = {
  buttonText: string;
  bodyText: string;
};

export class SnackbarsStore {
  isSuccessSnackVisible: boolean = false;
  isErrorSnackVisible: boolean = false;

  successSnack: TSnack | null = null;
  errorSnack: TSnack | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Установить успешный снекбар
   */
  setSuccessSnack(snack: TSnack) {
    this.isSuccessSnackVisible = true;
    this.successSnack = snack;
  }

  /**
   * Установить снекбар с ошибкой
   */
  setErrorSnack(snack: TSnack) {
    this.isErrorSnackVisible = true;
    this.errorSnack = snack;
  }

  /**
   * Сбросить успешный снекбар
   */
  resetSuccessSnack() {
    this.successSnack = null;
  }

  /**
   * Сбросить видимость успешного снекбара
   */
  resetSuccessSnackVisibility() {
    this.isSuccessSnackVisible = false;
  }

  /**
   * Сбросить снекбар с ошибкой
   */
  resetErrorSnack() {
    this.errorSnack = null;
  }

  /**
   * Сбросить видимость снекбара с ошибкой
   */
  resetErrorSnackVisibility() {
    this.isErrorSnackVisible = false;
  }
}

const snackbarsStore = new SnackbarsStore();

export default snackbarsStore;
