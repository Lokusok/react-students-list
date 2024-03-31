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
