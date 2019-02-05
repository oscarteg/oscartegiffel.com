import React from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Card from '../components/Card'

const IndexPage = ({ data, location }) => {
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout location={location} className={'flex flex-wrap justify-center'}>
      <SEO title="Home" keywords={[`homepage`, `oscar te giffel`, `gatsby`]} />
      {projects.map(project => {
        const { title, image, tags, description } = project.node.frontmatter
        const { slug } = project.node.fields
        return (
          <div
            className="m-5 max-w-sm w-full cursor-pointer"
            key={title}
            onClick={() => navigate(slug)}
          >
            <Card
              title={title}
              image={image}
              tags={tags}
              description={description}
            />
          </div>
        )
      })}
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
                fluid(grayscale: true, cropFocus: SOUTH) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
