import dotenv from "dotenv";
dotenv.config();

export default {
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN,
    secret: process.env.JWT_SECRET,
  },
  port: process.env.PORT || 3000,
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  superAdminId: process.env.SUPER_ADMIN_ID,
  yelpAPIKey: process.env.YELP_API_KEY,
};
