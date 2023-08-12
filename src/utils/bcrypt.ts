import bcrypt from "bcrypt";

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function comparePassword(
  plainPassword : string,
  hashedPassword :string
): Promise<boolean> {
  const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);
  return isPasswordValid;
}

export { hashPassword, comparePassword };
