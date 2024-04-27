import { observer } from 'mobx-react-lite';

import ProfileInfo from '@src/components/profile-info';

import { useStores } from '@src/hooks/use-stores';

import studentsStore from '@src/store/students';

import { TUserInfo } from '@src/shared/types';

function ProfileWrapper() {
  const { sessionStore, snackbarsStore, modalsStore } = useStores();

  const callbacks = {
    updateUserInfo: async (userInfo: FormData) => {
      await sessionStore.changeUserInfo(userInfo);

      if (sessionStore.error) {
        return snackbarsStore.setErrorSnack({
          buttonText: 'Понятно',
          bodyText: 'Произошла ошибка при изменении',
        });
      }

      snackbarsStore.setSuccessSnack({
        buttonText: 'Понятно',
        bodyText: 'Обновление прошло успешно!',
      });
    },
  };

  const handlers = {
    onInfoFormSubmit: (userInfo: TUserInfo) => {
      const formData = new FormData();
      const avatarFile = userInfo.avatar.item(0);

      formData.append('avatar', avatarFile as File);
      formData.append('username', userInfo.username);
      formData.append('bio', userInfo.bio);

      callbacks.updateUserInfo(formData);
    },
    onDeleteBtnClick: () => {
      modalsStore.addActiveModal('confirmPasswordUserDelete');
    },
  };

  const values = {
    favouritesStudents: studentsStore.students.filter((s) => s.isFavourite),
  };

  return (
    <ProfileInfo
      students={values.favouritesStudents}
      profile={sessionStore.profile!}
      onInfoFormSubmit={handlers.onInfoFormSubmit}
      isInfoSubmitDisabled={sessionStore.waiting}
      onDeleteBtnClick={handlers.onDeleteBtnClick}
    />
  );
}

export default observer(ProfileWrapper);
