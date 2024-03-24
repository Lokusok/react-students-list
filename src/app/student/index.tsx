import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function StudentPage() {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>Страница студента</title>
      </Helmet>

      <h3>Студент {id}</h3>
    </>
  );
}

export default memo(StudentPage);
