import { useStaticQuery, graphql } from "gatsby";

export const useSiteCategories = () => {
  const { allStrapiCategory } = useStaticQuery(
    graphql`
      query Categories {
        allStrapiCategory {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    `
  )
  return allStrapiCategory.edges
}