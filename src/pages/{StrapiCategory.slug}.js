import * as React from 'react'
import { graphql } from 'gatsby'

// Components
import Layout from '../components/layout'
import Seo from '../components/seo'

// Render
export default function Category(props) {
  const title = props.data.strapiCategory.name
  return (
    <Layout pageTitle="Page"> 
      <Seo title="Page" />
      <h1>{title}</h1>
      <p>General Category Content</p>
      <ul>
        <li>Post 1</li>
        <li>Post 2</li>
        <li>Post 3</li>
      </ul>
    </Layout>
  )
}

// Graphql call
export const query = graphql`
  query Category($slug: String) {
    strapiCategory(slug: {eq: $slug}) {
      name
    }
  }
`