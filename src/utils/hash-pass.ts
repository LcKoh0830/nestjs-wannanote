import * as bcrypt from 'bcrypt';

export async function HashPass(pass: string) {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(pass, saltOrRounds);
  return hash;
}
