import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div className="max-w-full px-4 container">
    <div className="mx-auto pt-12 pb-8">
      <div className="max-w-xl">
        <h1
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
          {siteTitle}
        </h1>
      </div>
      <p className="text-2xl my-6 leading-loose">
        Thoughts &amp; insights on
        <strong className="highlight">Web Development</strong> with a focus on
        <strong className="highlight">Craft CMS</strong>,
        <strong className="highlight">Front-end Tools</strong> and
        <strong className="highlight">Best-Practices.</strong>
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
