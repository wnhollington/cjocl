import * as React from 'react'
import { graphql } from 'gatsby'

// Components
import Layout from '../components/layout'
import Seo from '../components/seo'

// Render
export default function Page(props) {
  const title = props.data.strapiArticle.title
  return (
    <Layout pageTitle="Page"> 
      <Seo title="Page" />
      <h1>{title}</h1>
      <p>General Page Contrent</p>
    </Layout>
  )
}

// Graphql call
export const query = graphql`
  query Article($slug: String) {
    strapiArticle(slug: {eq: $slug}) {
      title
      created_at
      content
    }
  }
`