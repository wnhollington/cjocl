import * as React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from "react-markdown"

// Components
import Layout from '../components/layout'

// Render
export default function Article(props) {
  const title = props.data.strapiArticle.title
  const content = props.data.strapiArticle.content
  return (
    <Layout pageTitle="Page"> 
      <h1>{title}</h1>
      <ReactMarkdown children={content} escapeHtml={false}/>
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