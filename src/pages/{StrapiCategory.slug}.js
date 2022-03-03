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
      <h1>{title}</h1>
      {articles.map(article => {
        const title = article.title
        const slug = article.slug
        const description = article.description
        return (
          <article class="blog-post">
            <h2 class="blog-post-title">{title}</h2>
            <p>{description}</p>
            <Link to={`/${slug}`}>Continue Reading</Link>
          </article>
        )
      })}
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