import { v4 as uuidv4 } from "uuid";
import client from "../client.js";

const controller = {
  index(userId) {
    return client.voteLink.findMany({
      where: {
        admin: {
          id: userId,
        },
      },
    });
  },

  show(url) {
    return client.voteLink.findUniqueOrThrow({
      where: {
        url,
      },
    });
  },

  create(admin, { name, location }) {
    const url = uuidv4();
    return client.voteLink.create({
      data: {
        admin: {
          connect: {
            id: admin,
          },
        },
        url,
        name: name || url,
        location,
      },
    });
  },

  async vote(url, cuisineVote) {
    if (!cuisineVote) {
      const error = new Error("Please select a cuisine");

      // Make this match the HTTP status code
      error.code = 400;

      throw error;
    }

    const voteLink = await client.voteLink.findUniqueOrThrow({
      where: {
        url,
      },
    });

    if (!voteLink.isActive) {
      const error = new Error("This vote link has been deactivated");

      // Make this match the HTTP status code
      error.code = 400;

      throw error;
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

  async deactivate(url, userId) {
    const voteLink = await client.voteLink.findUniqueOrThrow({
      where: {
        url,
      },
    });

    if (voteLink.adminId !== userId) {
      const error = new Error("You are not authorized to deactivate this link");

      // Make this match the HTTP status code
      error.code = 401;

      throw error;
    }

    return client.voteLink.update({
      where: {
        url,
      },
      data: {
        isActive: false,
      },
    });
  },

  destroyBySuperUser(userId) {
    return client.voteLink.deleteMany({
      where: {
        adminId: userId,
      },
    });
  },
};

export default controller;
