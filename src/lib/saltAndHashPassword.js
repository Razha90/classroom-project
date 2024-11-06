import bcrypt from 'bcryptjs';

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

// Fungsi untuk hashing password
const saldAndHashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      console.log('Hashed Password:', hash);
      resolve(hash);
    });
  });
};

export default saldAndHashPassword;
