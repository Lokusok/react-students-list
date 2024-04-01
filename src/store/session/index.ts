import { makeAutoObservable } from 'mobx';

class SessionStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
