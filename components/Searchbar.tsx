"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useEffect, useState } from 'react'
import getCookie from '../lib/actions/getCookie';

const isValidProductURL = (url: string) => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.includes('amazon.') || hostname.includes('croma.') || hostname.includes('flipkart.') || hostname.includes('reliancedigital.')
  } catch (error) {
    return false;
  }
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidProductURL(searchPrompt);

    if (!isValidLink) return alert('Please provide a valid link')

    try {
      setIsLoading(true);
      const userEmail = getCookie("user_email");
      // console.log(userEmail);

      const product = await scrapeAndStoreProduct(searchPrompt, userEmail);
      if (product) open(`products/${product?.id}`, '_blank') // Open product page after scraping

      // const product = await scrapeProduct(searchPrompt);
      // if (product) {
      //   product.description = JSON.parse(product.description)
      //   console.log('Product scraped successfully!');
      //   console.log(JSON.stringify(product, null, 2));
      // } else console.error('Product not scraped');

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />

      <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}> {isLoading ? 'Searching...' : 'Search'} </button>
    </form>
  )
}

export default Searchbar