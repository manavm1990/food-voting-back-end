/**
 * If a field is not passed in, we don't want to validate it.
 * Prisma validation will take care of missing fields.
 * It's why we are using the optional chaining operator.
 */

import bcrypt from "bcrypt";
import config from "../config.js";

function validateUser(user) {
  if (user.username?.length < 3 || user.username?.length > 20)
    throw new Error("Username must be between 3 and 20 characters.");

  if (user.username?.includes(" "))
    throw new Error("Username cannot contain spaces.");

  if (user.password?.length < 8 || user.password?.length > 20)
    throw new Error("Password must be between 8 and 20 characters.");
}

export const prepUser = async (user) => {
  validateUser(user);

  const ret = { ...user };

  ret.username = ret.username?.trim().toLowerCase();

  // * ⚠️ If we don't have a password, we don't want to hash it.
  if (!ret.password) return ret;

  const salt = await bcrypt.genSalt(config.saltRounds);
  ret.password = await bcrypt.hash(ret.password, salt);

  return ret;
};