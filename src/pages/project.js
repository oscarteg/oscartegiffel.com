import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const IndexPage = ({ data, location }) => {
  const post = data.markdownRemark
  const { title } = post.frontmatter
  return (
    <Layout location={location}>
      <SEO title="Home" keywords={[`homepage`, `oscar te giffel`, `gatsby`]} />
      <h1 className="title">{title}</h1>
      <div className={"content"} dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
