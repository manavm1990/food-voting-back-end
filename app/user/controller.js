import client from "../client.js";

const controller = {
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
};

const createdUser = await controller
  .create({
    username: "john",
    password: "password",
  })
  .catch((err) => {
    console.error(err.message);
  });

console.log(createdUser, "createdUser");

const updatedUser = await controller.update(createdUser.id, {
  username: "johnny",
});

console.log(updatedUser, "updatedUser");

export default controller;
