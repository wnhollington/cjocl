import { useStaticQuery, graphql } from "gatsby";

export const useSiteCategories = () => {
  const { allStrapiCategory } = useStaticQuery(
    graphql`
      query Categories {
        allStrapiCategory {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `
  )
  return allStrapiCategory.edges
}