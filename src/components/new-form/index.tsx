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
  onChange: (e: React.ChangeEvent<TInputs>) => any;
  onExtraChange: (id: string, value: string) => any;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  avatar: File | null | undefined;
};

function NewForm(props: TProps) {
  const options = {
    isDisabled: Object.keys(props.studentData).some((key) => {
      const value = props.studentData[key as keyof typeof props.studentData];

      if (key === 'child-role' && value === 'default') return true;
      return value === '';
    }),
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography gutterBottom fontWeight={900} fontSize={20}>
        Добавить нового
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Box component="form" autoComplete="off" sx={{ width: '100%' }}>
          <Stack direction="column" spacing={2}>
            <Box>
              <InputLabel shrink htmlFor="student-name">
                Имя ученика:
              </InputLabel>
              <Input
                value={props.studentData['student-name']}
                onChange={props.onChange}
                id="student-name"
                placeholder="Как зовут ученика?"
              />
            </Box>

            <Box sx={{ width: 300 }}>
              <InputLabel shrink htmlFor="student-role">
                Роль ученика:
              </InputLabel>

              <Select
                options={studentsRoles}
                id="student-role"
                value={props.studentData['student-role']}
                onChange={props.onExtraChange}
              />
            </Box>

            <Box sx={{ width: 300 }}>
              <InputLabel shrink htmlFor="student-age">
                Возраст ученика:
              </InputLabel>

              <NumberInput
                id="student-age"
                value={props.studentData['student-age']}
                onChange={props.onExtraChange}
                min={0}
                max={100}
              />
            </Box>

            <Box>
              <InputLabel shrink htmlFor="student-notes">
                Иные примечания:
              </InputLabel>

              <Textarea
                onChange={props.onChange}
                id="student-notes"
                value={props.studentData['student-notes']}
                placeholder="Трудолюбив, ..."
              />
            </Box>

            <Box>
              <InputLabel shrink htmlFor="student-avatar">
                Фото (необязательно):
              </InputLabel>

              <Input
                id="student-avatar"
                onChange={props.onAvatarChange}
                type="file"
              />
              {props.avatar && (
                <Paper sx={{ mt: 1.5, maxWidth: 300 }} elevation={3}>
                  <img width={300} src={URL.createObjectURL(props.avatar)} />
                </Paper>
              )}
            </Box>

            <Box>
              <Button disabled={options.isDisabled} variant="contained">
                Добавить
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}

export default memo(NewForm);
