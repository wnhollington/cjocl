const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

// Create Pages
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    // Templates
    const articleTemplate = path.resolve('./src/templates/article.js')

    // this graphql is function string to pass graphql query, this is a node version of graphql
    // this query returns a promise of slugs. use then instead of async await
    return graphql(`
    query loadSlugQuery ($limit: Int!){
        allStrapiArticle(
            limit: $limit
        ) {
            edges {
                node {
                  title
                  slug
                }
            }
        }
    }
    `, { limit: 1000}).then(result => {

        // Create Blog Pages and Pagination
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
}