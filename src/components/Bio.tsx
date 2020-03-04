import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StaticQuery, graphql } from 'gatsby'

const Bio = () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            author
            social {
              twitter
              linkedin
              github
              gitlab
            }
          }
        }
        file(relativePath: { eq: "images/profile.jpg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => {
      const {
        twitter,
        linkedin,
        github,
        gitlab,
      } = data.site.siteMetadata.social
      const profileImage = data.file.childImageSharp.fluid
      const { author } = data.site.siteMetadata

      return (
        <div className="flex-wrap flex shadow rounded-lg p-8 my-8 bg-gray-100">
          <div className="md:mr-12 flex-no-shrink w-full md:w-auto justify-center items-end">
            <Img
              fluid={profileImage}
              className="rounded-full mb-0 bio-pic w-24"
            />
          </div>
          <div>
            <p className="my-4">
              Hallo, Ik ben <strong>{author}</strong>.<br />
              Developer die altijd nieuwe dingen wilt leren.
            </p>
            <ul className="social-links list-reset flex">
              <li>
                <a
                  href={`https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlight"
                >
                  <FontAwesomeIcon
                    icon={['fab', 'twitter']}
                    className="fa-xs"
                  />
                </a>
              </li>
              <li>
                <a
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlight"
                >
                  <FontAwesomeIcon
                    icon={['fab', 'linkedin']}
                    className="fa-xs"
                  />
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlight"
                >
                  <FontAwesomeIcon icon={['fab', 'github']} className="fa-xs" />
                </a>
              </li>

              <li>
                <a
                  href={`https://gitlab.com/${gitlab}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlight"
                >
                  <FontAwesomeIcon icon={['fab', 'gitlab']} className="fa-xs" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      )
    }}
  />
)

export default Bio
