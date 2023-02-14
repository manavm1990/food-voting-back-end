import client from "../client.js";
import config from "../config.js";
import { generateToken, isValid } from "./utils.js";

const controller = {
  async index() {
    return client.user.findMany({
      select: { id: true, username: true },
    });
  },

  async show(username, password) {
    const user = await client.user.findUniqueOrThrow({
      where: {
        username,
      },
    });

    if (!(await isValid(user, password))) {
      const error = new Error("Invalid username or password.");
      error.code = 401;
      throw error;
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
    if (id === config.superAdminId) {
      return Promise.reject(new Error("Cannot delete super admin."));
    }

    return client.user.delete({ where: { id } });
  },
};

export default controller;
