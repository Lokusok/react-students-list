export type TInputs =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export type TStudentData = {
  name: string;
  age: string | number;
  role: string;
  notes: string;
  avatar: File | string | null | undefined;
};

export type TUserRegister = {
  login: string;
  password: string;
  passwordAgain: string;
};

export type TUserLogin = {
  login: string;
  password: string;
  remember: boolean;
};

export type TUserMainLogin = {
  login: string;
  password: string;
};

export type TCountRoles = {
  excellent: string | number;
  good: string | number;
  normal: string | number;
  bad: string | number;
};

export type TUserInfo = {
  username: string;
  bio: string;
  avatar: FileList;
};

export type TProfile = {
  id: string;
  username: string;
  login: string;
  password: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
};
