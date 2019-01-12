import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div className="max-w-full px-4">
    <div className="mx-auto max-w-2xl pt-12 pb-8">
      <h1 className="my-0 leading-loose text-4xl font-bold">
        <Link
          to="/"
          style={{
            // color: `white`,
            // textDecoration: `none`,
          }}>
        {siteTitle}
        </Link>
      </h1>
      <p className="text-2xl my-6 leading-loose">
        Thoughts &amp; insights on <strong className="highlight">Web Development</strong> with a focus on <strong className="highlight">Craft CMS</strong>, <strong className="highlight">Front-end Tools</strong> and <strong className="highlight">Best-Practices.</strong>
      </p>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
