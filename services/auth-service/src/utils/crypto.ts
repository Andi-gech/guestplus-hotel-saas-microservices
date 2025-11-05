import bcrypt from "bcrypt";

export const hashPassword = (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generate6DigitCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
