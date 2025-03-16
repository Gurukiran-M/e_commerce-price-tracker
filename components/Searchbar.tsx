"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useEffect, useState } from 'react'
import getCookie from '../lib/actions/getCookie';

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.endsWith('amazon')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}


const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [email, setEmail] = useState("");

<<<<<<< HEAD
  // useEffect(() => {
  //   const storedEmail = localStorage.getItem("email");
  //   if (storedEmail) {
  //     setEmail(storedEmail);
  //   }
  // }, []);
=======

>>>>>>> b93c387a7646e2516264ff3396db6a9ceb3c1ac6

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) return alert('Please provide a valid Amazon link')

    try {
      setIsLoading(true);
      // Scrape the product page
<<<<<<< HEAD
      // console.log(email);      
      const userEmail = getCookie("user_email");
      console.log(userEmail);
      const product = await scrapeAndStoreProduct(searchPrompt,userEmail);
      if (product) open(`products/${product?.id}`, '_blank')          // Open product page after scraping
=======
>>>>>>> b93c387a7646e2516264ff3396db6a9ceb3c1ac6
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