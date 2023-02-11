import client from "../client.js";
import config from "../config.js";
import { generateToken, isValid } from "./utils.js";

const controller = {
  async index() {
    return client.user.findMany();
  },

  async show(username, password) {
    const user = await client.user.findUniqueOrThrow({
      where: {
        username,
      },
    });

    if (!(await isValid(user, password))) {
      throw new Error(
        config.errors.find((error) => error.code === "C0001").message
      );
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

controller
  .create({
    username: "super",
    password: "supertest",
    isSuperUser: true,
  })
  .then(() => {
    console.info("Super user created.");
  })
  .catch((e) => {
    console.error(e.message);
  });

export default controller;
