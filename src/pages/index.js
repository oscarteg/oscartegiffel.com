import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Card from '../components/Card'

const IndexPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      {projects.map(project => (
        <Card
          key={project.node.fields}
          title={project.node.frontmatter.title}
          image={project.node.frontmatter.image.childImageSharp.fixed}
        />
      ))}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            image {
              childImageSharp {
                fixed(width: 200) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`
