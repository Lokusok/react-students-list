import { observer } from 'mobx-react-lite';

import { useStores } from '@src/hooks/use-stores';

import InfoSnackbar from '@src/components/info-snackbar';
import SuccessSnackbar from '@src/components/success-snackbar';
import ErrorSnackbar from '@src/components/error-snackbar';

function AllSnackbars() {
  const { snackbarsStore } = useStores();

  return (
    <>
      <InfoSnackbar
        isOpen={Boolean(snackbarsStore.isInfoSnackVisible)}
        onClose={() => snackbarsStore.resetInfoSnackVisibility()}
        onUnmount={() => snackbarsStore.resetInfoSnack()}
        buttonText={snackbarsStore.infoSnack?.buttonText}
        bodyText={snackbarsStore.infoSnack?.bodyText}
      />

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
        buttonText={snackbarsStore.errorSnack?.buttonText}
        bodyText={snackbarsStore.errorSnack?.bodyText}
      />
    </>
  );
}

export default observer(AllSnackbars);
