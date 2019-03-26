/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        pages: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "pages" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        projects: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { sourceInstanceName: { eq: "projects" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create project pages.
    const projects = result.data.projects.edges

    projects.forEach((project, index) => {
      const previous =
        index === projects.length - 1 ? null : projects[index + 1].node
      const next = index === 0 ? null : projects[index - 1].node

      createPage({
        path: project.node.fields.slug,
        component: path.resolve(`./src/templates/project.tsx`),
        context: {
          slug: project.node.fields.slug,
          previous,
          next,
        },
      })
    })

    const pages = result.data.pages.edges

    pages.forEach(page => {
      createPage({
        path: page.node.fields.slug,
        component: path.resolve(`./src/templates/page.tsx`),
        context: {
          slug: page.node.fields.slug,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const slug = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({
      node,
      name: `modifiedTime`,
      value: fileNode.modifiedTime,
    })

    createNodeField({
      name: `sourceInstanceName`,
      node,
      value: fileNode.sourceInstanceName,
    })
  }
}
