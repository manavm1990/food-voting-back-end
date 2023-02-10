import dotenv from "dotenv";
dotenv.config();

export default {
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN,
    secret: process.env.JWT_SECRET,
  },
  port: process.env.PORT,
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
};
