import client from "../client.js";

const controller = {
  create(newUser) {
    return client.user.create({ data: newUser });
  },
};

const createdUser = await controller
  .create({ username: "JACK", password: "LOWERME" })
  .catch((error) => {
    console.error(error.message);
  });

console.log(createdUser);
