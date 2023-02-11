// https://api.yelp.com/v3/businesses/search?location=62236&radius=40000&term=restaurants&categories=chinese&sort_by=best_match
import got from "got";
import config from "../config.js";
import { convertMiles2Meters, getRandomInt } from "./utils.js";

const controller = {
  async getRandomRestaurant({ location, radius = 40000, category } = {}) {
    // * Convert the radius from miles to meters
    // * Round the radius to the nearest whole number (not decimals)
    const radiusInMeters = Math.round(convertMiles2Meters(radius));

    if (radiusInMeters > 40000) {
      const err = new Error("The radius cannot be greater than 25 miles");
      err.status = 400;
      throw err;
    }

    const url = `https://api.yelp.com/v3/businesses/search?location=${location}&radius=${radiusInMeters}&term=restaurants&categories=${category}&sort_by=best_match`;

    // * Fetch the data from the API
    const data = await got(url, {
      headers: {
        Authorization: config.yelpAPIKey,
      },
    })
      // * Convert the response body to JSON
      .json();

    const { businesses: restaurants } = data;

    const randomIndex = getRandomInt(0, restaurants.length);

    return restaurants[randomIndex];
  },
};

export default controller;
