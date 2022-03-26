import { Link } from "gatsby"
import { default as React } from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  HitsPerPage,
  Pagination,
  Index,
  Snippet,
} from "react-instantsearch-dom"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
})

const PageHit = ({ hit }) => (
  <article>
    <Link to={`/${hit.category.slug}/${hit.slug}`} >
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="description" hit={hit} tagName="mark" />
  </article>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <div className="hits-menu d-flex">
      <HitCount />
      <HitsPerPage
        defaultRefinement={4}
        items={[
          { value: 5, label: '5' },
          { value: 10, label: '10' },
          { value: 15, label: '15' },
        ]}
      />
    </div>
    <Hits className="Hits" hitComponent={PageHit} />
    <Pagination
        showFirst={true}
        showLast={true}
        showPrevious={true}
        showNext={true}
        padding={2}
        totalPages={3}
      />
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
  </div>
)

export default SearchResult