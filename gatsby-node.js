const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

// Create Pages
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    // Templates
    const articleTemplate = path.resolve('./src/templates/article.js')
    const categoryTemplate = path.resolve('./src/templates/category.js')
    const blogListTemplate = path.resolve('./src/templates/index.js')
    const writerTemplate = path.resolve('./src/templates/writer.js')

    // this graphql is function string to pass graphql query, this is a node version of graphql
    // this query returns a promise of slugs. use then instead of async await
    return graphql(`
      query articleAndCategory ($limit: Int!){
          allStrapiArticle(limit: $limit) {
            edges {
                node {
                  title
                  slug
                  featured
                }
            }
          }
          allStrapiCategory(limit: $limit) {
            edges {
              node {
                name
                slug
                description
                articles {
                  id
                }
              }
            }
          }
          allStrapiWriter{
            edges {
              node {
                name
                email
                slug
              }
            }
          }
      }
    `, { limit: 1000}).then(result => {

        // Create Single Article Pages and Pagination
        const posts = result.data.allStrapiArticle.edges
        posts.forEach((post, index) => {
            
            // create prev and next on each posts render (for Blog Post Pagination, BPP)
            const previous = index === posts.length - 1 ? null : posts[index + 1].node
            const next = index === 0 ? null : posts[index - 1].node

            // previous and next are objects props sent as pageContect object to blogPostTemplate
            createPage({
                path: `/${post.node.slug}`,
                component: articleTemplate,
                context: {
                    slug: post.node.slug,
                    previous,
                    next,
                },
            })
        })

        // Create Blog List and Pagination for Index Page
        // Screen Featured Posts from Article List
        const indexedPosts = posts.filter(post => post.node.featured !== true)
        const postsPerPage = 8
        const numPages = Math.ceil(indexedPosts.length / postsPerPage)

        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/` : `/${i + 1}`,
                component: blogListTemplate,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1
                },
            });
        });

        // Create Category Pages and Pagination
        const categories = result.data.allStrapiCategory.edges
        categories.forEach(category => {
          const categoryName = category.node.name
          const categorySlug = category.node.slug
          const categoryDescription = category.node.description
          const categoryPosts = category.node.articles
          const numPagesPerCategory = Math.ceil(categoryPosts.length / postsPerPage)
          Array.from({ length: numPagesPerCategory}).forEach((_, i) => {
              createPage({
                  path: i === 0 ? `/${categorySlug}` : `/${categorySlug}/${i + 1}`,
                  component: categoryTemplate,
                  context: {
                      limit: postsPerPage,
                      skip: i * postsPerPage,
                      currentPage: i + 1,
                      numPagesPerCategory,
                      categoryName,
                      categorySlug,
                      categoryDescription
                  }
              })
          })
        })

        // Create Writers Pages
        const writers = result.data.allStrapiWriter.edges
        writers.forEach(writer => {
          createPage({
            path: `/${writer.node.slug}`,
            component: writerTemplate,
            context: {
                name: writer.node.name,
                slug: writer.node.slug,
                email: writer.node.email,
                linkedin: writer.node.linkedin
            },
          })
        })
  })
}
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    if (node.internal.type === `strapiArticle`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
    if (node.internal.type === `strapiCategory`) {
      const value = createFilePath({ node, getNode })
      createNodeField({
          name: `slug`,
          node,
          value,
      })
    }
    if (node.internal.type === `strapiWriter`) {
      const value = createFilePath({ node, getNode })
      createNodeField({
          name: `slug`,
          node,
          value,
      })
    }
}