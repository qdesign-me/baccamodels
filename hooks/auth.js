import bcrypt from 'bcrypt';

export function createPassword(plain) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(plain, salt);
}

export function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}
