import studentsStore, { StudentsStore } from '@src/store/students';
import modalsStore, { ModalsStore } from '@src/store/modals';
import sessionStore, { SessionStore } from '@src/store/session';
import snackbarsStore, { SnackbarsStore } from '@src/store/snackbars';

type TGlobalStore = {
  studentsStore: StudentsStore;
  modalsStore: ModalsStore;
  sessionStore: SessionStore;
  snackbarsStore: SnackbarsStore;
};

export function useStores(): TGlobalStore {
  return {
    modalsStore,
    sessionStore,
    studentsStore,
    snackbarsStore,
  };
}
