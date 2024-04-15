export {};

declare global {
  type TStudent = {
    id: string;
    name: string;
    role: string;
    age: number | string;
    notes: string;
    avatar: string | null | undefined;
  };
}
