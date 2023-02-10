import client from "../client.js";

const controller = {
  create(newUser) {
    return client.user.create({ data: newUser });
  },
};

export default controller;
