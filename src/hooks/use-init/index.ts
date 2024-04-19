import { useEffect } from 'react';

type TInitFunc = () => void;

/**
 * Хук, который выполнится лишь раз.
 * Необходим для инициализации состояния в приложения
 * Используется на главных страницах (src/app)
 */
function useInit(initFunc: TInitFunc) {
  useEffect(initFunc, [initFunc]);
}

export default useInit;
