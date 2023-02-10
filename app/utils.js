import bcrypt from "bcrypt";
import config from "./config.js";

export const prepUser = async (user) => {
  if (!user.username || !user.password)
    throw new Error("Missing username or password.");

  const ret = { ...user };

  const salt = await bcrypt.genSalt(config.saltRounds);

  ret.username = ret.username.trim().toLowerCase();
  ret.password = await bcrypt.hash(ret.password, salt);

  return ret;
};
