"use client"

import { getSearchResults } from "@/lib/serpapi"
import { FormEvent, useState } from "react"
import { SearchResult } from "@/types";
import SearchResultCard from "./SearchResultCard";

const SearchSection = () => {
    const [productName, setProductName] = useState("");
    const [filters, setFilters] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [unknownSites, setUnknownSites] = useState(Array<SearchResult>)
    const [knownSites, setKnownSites] = useState(Array<SearchResult>)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true);

            // Fetch product search results
            const results = await getSearchResults(productName, filters);
            if (!results) { console.error("Couldn't find products"); return; }
            else console.log(results);
            setUnknownSites((results.unknownSites as Array<any>).slice(0, 8));
            setKnownSites(results.knownSites as Array<any>);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="trending-section">
            <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
                <input type="text" value={productName} placeholder="Enter product name" className="searchbar-input"
                    onChange={(e) => setProductName(e.target.value)} />

                <input type="text" value={filters} placeholder="Enter filters (Optional)" className="searchbar-input"
                    onChange={(e) => setFilters(e.target.value)} />

                <button type="submit" className="searchbar-btn" disabled={productName === ''}>{isLoading ? 'Searching...' : 'Search'}</button>
            </form>

            {(
                knownSites.length == 0 ? <></> : <>
                    <h2 className="section-text">Search results</h2>

                    <div className="flex flex-wrap gap-x-8 gap-y-16">
                        {knownSites?.map(result => <SearchResultCard key={result.productName} result={result} />)}
                    </div>
                </>
            )}

            {(
                unknownSites.length == 0 ? <></> : <>
                    <h2 className="section-text">Similar results</h2>
                    <div className="flex flex-wrap gap-x-8 gap-y-16">
                        {unknownSites?.map(result => <SearchResultCard key={result.productName} result={result} />)}
                    </div>
                </>
            )}
        </section>
    )
}

export default SearchSection;