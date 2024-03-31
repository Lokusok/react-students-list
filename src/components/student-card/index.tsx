import * as React from 'react';

import { Link } from 'react-router-dom';

import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

import studentImage from '@src/assets/student.jpg';

type TProps = {
  student: TStudent;
};

function StudentCard(props: TProps) {
  const { student } = props;

  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{student.name}</Typography>
        <Typography level="body-sm">{student.role}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>

      <AspectRatio
        component={Link}
        to={`/students/${student.id}`}
        state={{ from: window.location.pathname }}
        sx={{
          transition: 'opacity ease 0.2s',
          '&:hover': {
            opacity: 0.8,
          },
          '&:active': {
            opacity: 0.5,
          },
        }}
        minHeight="120px"
        maxHeight="200px"
      >
        <img src={studentImage} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography fontSize="xs">Роли:</Typography>
          <Typography fontSize="md" fontWeight="lg">
            {student.role}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label={`Перейти к информации о студенте с именем ${student.name}`}
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          component={Link}
          to={`/students/${student.id}`}
          state={{ from: window.location.pathname }}
        >
          Перейти
        </Button>
      </CardContent>
    </Card>
  );
}

export default React.memo(StudentCard);
