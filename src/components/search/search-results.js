import { Link } from "gatsby"
import { default as React } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  connectStateResults,
  Hits,
  Index,
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
  <Link to={`/${hit.category.slug}/${hit.slug}`}>
    <GatsbyImage image={hit.image.localFile.childImageSharp.gatsbyImageData}/>
    <h4 className="pt-2">{hit.title}</h4>
    <p>{hit.description}</p>
  </Link>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
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

	


