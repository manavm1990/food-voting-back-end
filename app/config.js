import dotenv from "dotenv";
dotenv.config();

export default {
  errors: [
    {
      // https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
      code: "P2002",
      message: "If this is related to a username, it's already taken.",
    },
    {
      code: "C0001",
      message: "Invalid credentials.",
    },
  ],
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN,
    secret: process.env.JWT_SECRET,
  },
  port: process.env.PORT || 3000,
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  superAdminId: process.env.SUPER_ADMIN_ID,
};
