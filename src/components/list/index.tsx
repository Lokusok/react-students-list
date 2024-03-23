import { memo } from 'react';

import { Grid } from '@mui/material';

import { students } from '@src/api/mock';
import StudentCard from '../student-card';

function List() {
  return (
    <Grid container spacing={2}>
      {students.map((student) => (
        <Grid item xs={12} md={6} lg={4}>
          <StudentCard key={student.id} student={student} />
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(List);
