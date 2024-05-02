import { useEffect } from 'react';

type TInitFunc = () => void;

/**
 * Хук, который выполнится лишь раз.
 * Необходим для инициализации состояния приложения
 * Используется на главных страницах (src/app)
 */
function useInit(initFunc: TInitFunc) {
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(initFunc, []);
}

export default useInit;
