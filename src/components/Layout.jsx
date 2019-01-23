import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'
import Footer from './Footer'
import Bio from './Bio'
import '../assets/layout.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const Layout = ({ children, location, className }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              author
              social {
                twitter
                linkedin
                github
              }
            }
          }
          file(relativePath: { eq: "images/profile.jpg" }) {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <>
            <Header siteTitle={data.site.siteMetadata.title} location={location}/>
            <div className={`container ${className}`}>
              {children}
            </div>
            <div className={`container max-w-md`}>
              <Bio
                author={data.site.siteMetadata.author}
                profileImage={data.file.childImageSharp.fluid}
                twitter={data.site.siteMetadata.social.twitter}
                linkedin={data.site.siteMetadata.social.linkedin}
                github={data.site.siteMetadata.social.github}
              />
            </div>
            <Footer />
          </>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
