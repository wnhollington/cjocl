import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

// Components
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'

// Render
export default function Category(props) {
  const category = props.data.strapiCategory
  const articles = props.data.strapiCategory.articles
  const aboutSection = (
    <>
      <h4 className='fst-italic'>Articles about {category.name}</h4>
      <p className="mb-0">{category.description}</p>
    </>
  )

  return (
    <Layout pageTitle="Categories"> 
      <div className="row g-5">
        <div className="col-md-8">
          {articles.map(article => {
            const title = article.title
            const slug = article.slug
            const description = article.description
            const date = article.created_at
            return (
              <article class="blog-post">
                <h2 class="blog-post-title">{title}</h2>
                <p class="blog-post-meta">{date}</p>
                <p>{description}</p>
                <Link to={`/${slug}`}>Continue Reading</Link>
              </article>
            )
          })}
        </div>
        <Sidebar aboutSection={aboutSection}/>
      </div>
    </Layout>
  )
}

// Graphql call
export const query = graphql`
  query Category($slug: String) {
    strapiCategory(slug: {eq: $slug}) {
      name
      description
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