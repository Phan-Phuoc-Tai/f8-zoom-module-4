export type UserData = {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  address: string | null;
  birthday: string | null;
};
