import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Bio = ({ author, profileImage, twitter, linkedin, github }) => (
  <div className="flex-wrap flex shadow rounded-lg p-8 my-8 bg-grey-lighter">
    <div className="md:mr-12 flex-no-shrink w-full md:w-auto justify-center">
      <Img
        fluid={profileImage}
        className="rounded-full mb-0 bio-pic h-full w-24"
      />
    </div>
    <div>
      <p className="my-4">
        Hallo, Ik ben <strong>{author}</strong>.<br />
        Webdeveloper die nooit iets afmaakt .
      </p>
      <ul className="social-links list-reset flex">
        <li>
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} className="fa-xs" />
          </a>
        </li>
        <li>
          <a
            href={`https://linkedin.com/in/${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'linkedin']} className="fa-xs" />
          </a>
        </li>
        <li>
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'github']} className="fa-xs" />
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default Bio