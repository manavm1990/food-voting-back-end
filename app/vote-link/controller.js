import { v4 as uuidv4 } from "uuid";
import client from "../client.js";

const controller = {
  getLinks(userId) {
    return client.voteLink.findMany({
      where: {
        admin: {
          id: userId,
        },
      },
    });
  },

  create(admin) {
    return client.voteLink.create({
      data: {
        admin: {
          connect: {
            id: admin,
          },
        },
        url: uuidv4(),
      },
    });
  },

  async vote(url, cuisineVote) {
    const voteLink = await client.voteLink.findUniqueOrThrow({
      where: {
        url,
      },
    });

    const indexOfVote = voteLink.votes.findIndex(
      (vote) => vote.cuisine === cuisineVote
    );

    // If it exists, update the vote, otherwise create a new vote
    indexOfVote > -1
      ? (voteLink.votes[indexOfVote].numOfVotes += 1)
      : voteLink.votes.push({ cuisine: cuisineVote, numOfVotes: 1 });

    return client.voteLink.update({
      where: {
        url,
      },
      data: {
        votes: {
          set: voteLink.votes,
        },
      },
    });
  },
};

const updatedVote = await controller.vote(
  "8ea4573e-b7e2-4d0d-babc-7a1db24a2ad5",
  "Chinese"
);

export default controller;
