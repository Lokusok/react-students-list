import studentsStore, { StudentsStore } from './students';
import modalsStore, { ModalsStore } from './modals';
import sessionStore, { SessionStore } from './session';

type TGlobalStore = {
  studentsStore: StudentsStore;
  modalsStore: ModalsStore;
  sessionStore: SessionStore;
};

export const useStores: () => TGlobalStore = () => {
  return {
    modalsStore,
    sessionStore,
    studentsStore,
  };
};
