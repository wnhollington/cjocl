import algoliasearch from "algoliasearch/lite"
import { default as React, useState, useMemo } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import SearchBox from "./search-box"
import SearchResult from "./search-results"

export default function Search({ indices }) {
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  return (
      <>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
            <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
          
            <SearchResult
              show={query && query.length > 0 && hasFocus}
              indices={indices}
              className="search-results"
            />
        </InstantSearch>
      </>
  )
}