import { memo } from 'react';
import { Helmet } from 'react-helmet';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>

      <h1>404. Страница не найдена...</h1>
    </>
  );
}

export default memo(NotFound);
