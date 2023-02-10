import client from "../client.js";

const controller = {
  index() {
    return client.cuisine.findMany({ select: { name: true } });
  },
};

export default controller;
