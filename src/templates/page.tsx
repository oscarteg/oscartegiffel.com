import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/Layout'
import SEO from '../components/Seo'

interface PageProps {
  data: any
  location: any
}

const Page: React.FunctionComponent<PageProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { html, frontmatter } = post
  const { title } = frontmatter
  return (
    <Layout location={location}>
      <SEO title="Home" keywords={[`homepage`, `oscar te giffel`, `gatsby`, `uses`]} description={`A page of all the things I use on a daily basis`} />
      <h1 className="title text-center">{title}</h1>

      <div className="max-w-lg mx-auto">
        <div className="my-6 border-b border-yellow-dark" />
        <div className={'content'} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query PagesBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
