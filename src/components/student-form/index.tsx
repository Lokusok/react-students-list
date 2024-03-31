import { memo } from 'react';

import {
  Box,
  InputLabel,
  Paper,
  Typography,
  Button,
  Stack,
} from '@mui/material';

import Input from '../input';
import Select from '../select';
import Textarea from '../textarea';

import { studentsRoles } from '@src/shared/data/students-roles';
import { TInputs, TStudentData } from '@src/shared/types';
import NumberInput from '../number-input';

type TProps = {
  studentData: TStudentData;
  onChange: (e: React.ChangeEvent<TInputs>) => void;
  onExtraChange: (id: string, value: string) => void;
  onAvatarChange: (val: File) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  submitText: string;
};

function StudentForm(props: TProps) {
  const options = {
    isDisabled: Object.keys(props.studentData).some((key) => {
      const value = props.studentData[key as keyof typeof props.studentData];

      if (key === 'role' && value === 'default') return true;
      // Примечания - не обязательны
      if (key === 'notes' && value === '') return false;

      return value === '';
    }),
  };

  const handlers = {
    onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const avatarFile = e.target?.files?.item(0);
      if (avatarFile) {
        props.onAvatarChange(avatarFile);
      }
    },
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography gutterBottom fontWeight={900} fontSize={20}>
        {props.title}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Box
          onSubmit={props.onSubmit}
          component="form"
          autoComplete="off"
          sx={{ width: '100%' }}
        >
          <Stack direction="column" spacing={2}>
            <Box>
              <InputLabel shrink htmlFor="name">
                Имя ученика:
              </InputLabel>
              <Input
                value={props.studentData['name']}
                onChange={props.onChange}
                id="name"
                placeholder="Как зовут студента?"
              />
            </Box>

            <Box sx={{ width: 320, position: 'relative' }}>
              <InputLabel shrink htmlFor="role">
                Роль студента:
              </InputLabel>

              <Select
                options={studentsRoles}
                id="role"
                value={props.studentData['role']}
                onChange={props.onExtraChange}
              />
            </Box>

            <Box sx={{ width: 320 }}>
              <InputLabel shrink htmlFor="age">
                Возраст студента:
              </InputLabel>

              <NumberInput
                id="age"
                value={props.studentData['age']}
                onChange={props.onExtraChange}
                min={0}
                max={150}
              />
            </Box>

            <Box>
              <InputLabel shrink htmlFor="notes">
                Иные примечания:
              </InputLabel>

              <Textarea
                onChange={props.onChange}
                id="notes"
                value={props.studentData['notes']}
                placeholder="Трудолюбив, ..."
              />
            </Box>

            <Box>
              <InputLabel shrink htmlFor="avatar">
                Фото (необязательно):
              </InputLabel>

              <Input
                id="avatar"
                onChange={handlers.onAvatarChange}
                type="file"
              />
              {props.studentData.avatar && (
                <Paper sx={{ mt: 1.5, maxWidth: 300 }} elevation={3}>
                  <img
                    width={300}
                    src={
                      typeof props.studentData.avatar === 'object'
                        ? URL.createObjectURL(props.studentData.avatar)
                        : props.studentData.avatar
                    }
                  />
                </Paper>
              )}
            </Box>

            <Box>
              <Button
                type="submit"
                disabled={options.isDisabled}
                variant="contained"
              >
                {props.submitText}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}

export default memo(StudentForm);
