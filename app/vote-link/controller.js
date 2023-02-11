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

    if (!voteLink.isActive) {
      throw new Error("This link is no longer active");
    }

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

  deactivate(url) {
    return client.voteLink.update({
      where: {
        url,
      },
      data: {
        isActive: false,
      },
    });
  },
};

export default controller;
