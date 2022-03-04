import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

// Components
import Layout from '../components/layout'

// Render
export default function Category(props) {
  const title = props.data.strapiCategory.name
  const articles = props.data.strapiCategory.articles

  return (
    <Layout pageTitle="Categories"> 
      <div className="row mb-2">
        {articles.map(article => {
          const title = article.title
          const slug = article.slug
          const description = article.description
          return (
            <div class="col-md-6">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250">
                <div class="col p-4 d-flex flex-column">
                  <h3 class="mb-0">{title}</h3>
                  <p class="card-text mb-auto">{description}</p>
                  <Link to={`/${slug}`}>Continue reading</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

// Graphql call
export const query = graphql`
  query Category($slug: String) {
    strapiCategory(slug: {eq: $slug}) {
      name
      articles {
        title
        author
        created_at
        slug
        description
      }
    }
  }
`