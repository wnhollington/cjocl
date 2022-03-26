import React from "react"
import { connectSearchBox, PoweredBy } from "react-instantsearch-dom"

export default connectSearchBox(
  ({ refine, currentRefinement, onFocus }) => (
    <div className="search-box d-flex flex-row justify-content-center align-items-center p-2 my-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
      <input
        className="search-input px-3"
        type="text"
        placeholder="Search..."
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <PoweredBy />
    </div>
  )
)