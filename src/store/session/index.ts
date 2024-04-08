import { makeAutoObservable } from 'mobx';

type TProfile = any; // @todo Описать нормальный тип

export class SessionStore {
  // loading: boolean = true; @todo Это должно быть по умолчанию
  loading: boolean = false;
  // profile: TProfile | null = null;
  profile: TProfile | null = {};

  constructor() {
    makeAutoObservable(this);
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
