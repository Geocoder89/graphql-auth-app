import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  return hashedPassword
}

export async function comparePassword (password: string, hashedPassword: string): Promise<Boolean> {
  const matchedPassword = await bcrypt.compare(password, hashedPassword) 

return matchedPassword
}