import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState, useMemo } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import SearchBox from "./search-box"
import SearchResult from "./search-results"
import useClickOutside from "./use-click-outside"

export default function Search({ indices }) {
  const rootRef = createRef()
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

  useClickOutside(rootRef, () => setFocus(false))

  return (
      <div class="modal fade" id="staticSearch" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticSearchLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <h5 class="modal-title text-center mb-2" id="staticSearchLabel">Search</h5>
            </div>
            <div class="modal-body">
              {/* Search */}
              <div ref={rootRef}>
                <InstantSearch
                  searchClient={searchClient}
                  indexName={indices[0].name}
                  onSearchStateChange={({ query }) => setQuery(query)}
                >
                  <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
                  <SearchResult
                    show={query && query.length > 0 && hasFocus}
                    indices={indices}
                  />
                </InstantSearch>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}