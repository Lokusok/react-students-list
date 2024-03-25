import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import StudentWrapper from '@src/containers/student-wrapper';

function StudentPage() {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>Страница студента</title>
      </Helmet>

      {id && <StudentWrapper id={id} />}
    </>
  );
}

export default memo(StudentPage);
