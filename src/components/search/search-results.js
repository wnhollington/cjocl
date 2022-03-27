import { Link } from "gatsby"
import { default as React } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  connectStateResults,
  Hits,
  HitsPerPage,
  Pagination,
  Index,
  connectRefinementList,
} from "react-instantsearch-dom"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
})

const CustomRefinementList = connectRefinementList(({ items, refine, searchForItems }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.label}>
          <button
            className="btn btn-primary"
            style={{ fontWeight: item.isRefined ? 'bold' : '', display: 'flex' }}
            onClick={event => {
              event.preventDefault();
              refine(item.value);
            }}
          >
            {item.label} ({item.count})
          </button>
        </li>
      ))}
    </ul>
  )
});


const PageHit = ({ hit }) => (
  <Link to={`/${hit.category.slug}/${hit.slug}`}>
    <GatsbyImage image={hit.image.localFile.childImageSharp.gatsbyImageData}/>
    <h4 className="pt-2">{hit.title}</h4>
    <p>{hit.description}</p>
  </Link>
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
      <CustomRefinementList attribute="category.name" limit={1000} operator="or" />
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

	


