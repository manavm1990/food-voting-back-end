import bcrypt from "bcrypt";
import config from "../config.js";

function validateUser(user) {
  if (!user.username || !user.password)
    throw new Error("Missing username or password.");

  if (user.username.length < 3 || user.username.length > 20)
    throw new Error("Username must be between 3 and 20 characters.");

  if (user.password.length < 8 || user.password.length > 20)
    throw new Error("Password must be between 8 and 20 characters.");

  return user;
}

export const prepUser = async (user) => {
  validateUser(user);

  const ret = { ...user };

  const salt = await bcrypt.genSalt(config.saltRounds);

  ret.username = ret.username.trim().toLowerCase();
  ret.password = await bcrypt.hash(ret.password, salt);

  return ret;
};
