import { makeAutoObservable } from 'mobx';

type TSnack = {
  buttonText: string;
  bodyText: string;
};

export class SnackbarsStore {
  isInfoSnackVisible: boolean = false;
  isSuccessSnackVisible: boolean = false;
  isErrorSnackVisible: boolean = false;

  infoSnack: TSnack | null = null;
  successSnack: TSnack | null = null;
  errorSnack: TSnack | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Установить снекбар с обычной информацией
   */
  setInfoSnack(snack: TSnack) {
    this.isInfoSnackVisible = true;
    this.infoSnack = snack;
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
   * Сбросить снекбар с информацией
   */
  resetInfoSnack() {
    this.infoSnack = null;
  }

  /**
   * Сбросить видимость информационного снекбара
   */
  resetInfoSnackVisibility() {
    this.isInfoSnackVisible = false;
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
