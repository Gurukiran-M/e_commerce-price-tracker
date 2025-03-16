"use client"

import { SearchResult } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { formatNumber } from "@/lib/utils";
import { scrapeAndStoreProduct } from '@/lib/actions';

interface Props {
  result: SearchResult;
}

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    return hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')
  } catch (error) {
    return false;
  }
}

const SearchResultCard = ({ result }: Props) => {

  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail)
  }, []);

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    if (isValidAmazonProductURL(result.productLink)) {
      const productId = await scrapeAndStoreProduct(result.productLink, email);
      open(`products/${productId?.id}`, '_blank')
    }
    else open(result.productLink, '_blank')
  }

  return (
    <Link href={result.productLink} className="product-card" onClick={handleRedirect}>
      <div className="product-card_img-container">
        <Image
          src={result.thumbnail}
          alt={result.productName}
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title">{result.productName}</h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {result.site}
          </p>

          <p className="text-black text-lg font-semibold">
            <span>{result.currency}</span>
            <span>{formatNumber(result.currentPrice)}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default SearchResultCard