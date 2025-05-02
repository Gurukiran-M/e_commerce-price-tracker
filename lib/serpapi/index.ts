"use server"

import { SearchResult } from "@/types";
import axios from "axios";
import * as cheerio from 'cheerio';
import { getJson } from "serpapi";

/**
 * Search for products with the given query and filters 
 */
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

    const results: Array<any> = json.shopping_results
    const searchResults: SearchResult[] = []
    const knownSites: SearchResult[] = [], unknownSites: SearchResult[] = []

    for (const result of results) {
      if (!result.link) { // When direct link is not present
        const response = await axios.get(result.product_link);
        const $ = cheerio.load(response.data);
        let allLinks = $('a');
        let links: Array<string | undefined> = []
        allLinks.each((i, link) => {
          if ($(link).text().search("Visit site") !== -1)
            links.push($(link).attr('href')?.replace(/^.*q=/, '').replace(/&.*$/, '')) //Get href link and extract the url
        })
        if (links[0]) result["link"] = decodeURIComponent(links[0])
        const uri = new URL(result.link)
        result.source = (uri.hostname?.replace("www.", "").replace(/\.\w*?$/, ""))
      }
      const data = {
        productName: result.title,
        currentPrice: result.extracted_price,
        currency: result.price.charAt(0),
        productLink: result.link,
        thumbnail: result.thumbnail,
        site: result.source
      }

      if (result.link.match("amazon.in|flipkart.com|croma.com|reliancedigital.in")) knownSites.push(data)
      else unknownSites.push(data)

      searchResults.push({
        productName: result.title,
        currentPrice: result.extracted_price,
        currency: result.price.charAt(0),
        productLink: result.link,
        thumbnail: result.thumbnail,
        site: result.source
      })
    }
    return { knownSites, unknownSites };
    // return json.shopping_results as Array<any>;
  } catch (error) {
    console.log(`Error while fetching search results: ${error}`);
  }
}
