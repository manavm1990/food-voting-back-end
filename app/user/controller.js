import client from "../client.js";
import { generateToken, isValid } from "./utils.js";

const controller = {
  async show(username, password) {
    const user = await client.user.findUniqueOrThrow({
      where: {
        username,
      },
    });

    if (!(await isValid(user, password))) {
      throw new Error("Invalid credentials.");
    }

    return generateToken(user);
  },

  create(newUser) {
    return client.user.create({ data: newUser });
  },

  async update(id, data) {
    return client.user.update({
      where: { id },

      // Only the updated fields here.
      data,
    });
  },

  delete(id) {
    return client.user.delete({ where: { id } });
  },
};

export default controller;
