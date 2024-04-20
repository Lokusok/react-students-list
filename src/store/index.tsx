import studentsStore, { StudentsStore } from './students';
import modalsStore, { ModalsStore } from './modals';
import sessionStore, { SessionStore } from './session';
import snackbarsStore, { SnackbarsStore } from './snackbars';

type TGlobalStore = {
  studentsStore: StudentsStore;
  modalsStore: ModalsStore;
  sessionStore: SessionStore;
  snackbarsStore: SnackbarsStore;
};

export const useStores: () => TGlobalStore = () => {
  return {
    modalsStore,
    sessionStore,
    studentsStore,
    snackbarsStore,
  };
};
