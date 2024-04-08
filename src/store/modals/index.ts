import { makeAutoObservable } from 'mobx';

/**
 * Стор для модалок, с возможностью каскада
 */
export class ModalsStore {
  activeModals: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Добавить активную модалку
   */
  addActiveModal(modalName: string) {
    this.activeModals.push(modalName);
  }

  /**
   * Убрать модалку из активных
   */
  removeActiveModal(modalName: string) {
    this.activeModals = this.activeModals.filter(
      (modalId) => modalId !== modalName
    );
  }
}

const modalsStore = new ModalsStore();

export default modalsStore;
