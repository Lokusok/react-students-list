import { observer } from 'mobx-react-lite';

import { useStores } from '@src/store';

import SuccessSnackbar from '@src/components/success-snackbar';
import ErrorSnackbar from '@src/components/error-snackbar';

function AllSnackbars() {
  const { snackbarsStore } = useStores();

  return (
    <>
      <SuccessSnackbar
        isOpen={Boolean(snackbarsStore.isSuccessSnackVisible)}
        onClose={() => snackbarsStore.resetSuccessSnackVisibility()}
        onUnmount={() => snackbarsStore.resetSuccessSnack()}
        buttonText={snackbarsStore.successSnack?.buttonText}
        bodyText={snackbarsStore.successSnack?.bodyText}
      />

      <ErrorSnackbar
        isOpen={Boolean(snackbarsStore.isErrorSnackVisible)}
        onClose={() => snackbarsStore.resetErrorSnackVisibility()}
        onUnmount={() => snackbarsStore.resetErrorSnack()}
        buttonText={snackbarsStore.successSnack?.buttonText}
        bodyText={snackbarsStore.successSnack?.bodyText}
      />
    </>
  );
}

export default observer(AllSnackbars);
