"use server"

import { getJson } from "serpapi";

export async function getSearchResults(query: string, filters: string) {
  try {
    if (!process.env.SERPAPI_KEY) console.log("SerpApi key not defined")
    console.log("Searching for product");
    const json = await getJson({
      engine: "google_shopping",
      q: query,
      shoprs: filters,
      google_domain: "google.co.in",
      gl: "in",
      hl: "en",
      location: "India",
      api_key: process.env.SERPAPI_KEY,
      device: "mobile",
      num: 100
    });
    return json.shopping_results as Array<any>;
  } catch (error) {
    console.log(`Error while fetching search results: ${error}`);
  }
}

export async function getAmazonLinks(query: string, filters: string) {
  try {
    const json = await getJson({
      engine: "google_shopping",
      q: query,
      shoprs: filters,
      google_domain: "google.co.in",
      gl: "in",
      hl: "en",
      location: "India",
      api_key: process.env.SERPAPI_KEY,
      device: "mobile",
      num: 100
    });
    if (!json) return;
    return json.shopping_results.filter((e: any) => e.link.search("amazon.in") != -1) as Array<any>;
  } catch (error) {
    console.log(`Error while fetching amazon link from search results: ${error}`);
  }
}