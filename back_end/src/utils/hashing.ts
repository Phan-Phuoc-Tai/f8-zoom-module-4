import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

const verifyPassword = (password: string, passwordHash: string) => {
  return bcrypt.compareSync(password, passwordHash);
};

export { hashPassword, verifyPassword };
