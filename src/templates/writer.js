import * as React from 'react'
import { Link, graphql } from 'gatsby'

// Components
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'

// Render
const Writer = ({ data, pageContext }) => {
  const {name, slug, email, linkedin } = pageContext
  const articles = data.allStrapiArticle.edges

  return (
    <Layout pageTitle={name}>
      <h1>{name}</h1>
      <h2>{slug}</h2>
      <h3>{email}</h3>
      <h4>{linkedin}</h4>
      <p>{articles[0].node.title}</p>
    </Layout>
  )

}
export default Writer

// Graphql 
export const query = graphql`
  query Writer($slug: String) {
    allStrapiArticle(filter: {author: {slug: {eq: $slug}}}) {
      edges {
        node {
          title
          slug
          description
          created_at(formatString: "DD MM YYYY")
        }
      }
    }
  }
`