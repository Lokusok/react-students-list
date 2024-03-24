export {};

declare global {
  type TStudent = {
    id: number;
    name: string;
    role: string;
    age: number | string;
    notes: string;
  };
}
