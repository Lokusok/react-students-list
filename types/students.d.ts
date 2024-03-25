export {};

declare global {
  type TStudent = {
    id: string | number;
    name: string;
    role: string;
    age: number | string;
    notes: string;
  };
}
