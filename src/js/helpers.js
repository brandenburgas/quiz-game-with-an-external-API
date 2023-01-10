import { API_URL } from "./config.js";

export const randomiseArray = function (arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const getJSON = async function (url) {
  try {
    const response = await fetch(url);

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const generateURL = function (settings) {
  return `${API_URL}&${settings.amount}&${settings.category}&${settings.difficulty}`;
};
