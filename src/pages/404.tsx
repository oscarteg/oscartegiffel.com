import React from 'react'

import Layout from '../layouts/Layout'
import SEO from '../components/Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigate } from 'gatsby'

const NotFoundPage = ({ location }) => (
  <Layout location={location} className="text-center">
    <SEO title="404: Not found" />
    <h1 className="title text-center">NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

    <div className="mt-5" onClick={() => navigate('/')}>
      <button className="btn bg-yellow text-yellow-600 hover:bg-yellow-600 font-bold py-2 px-4 rounded inline-flex items-center hover:text-yellow-200">
        <FontAwesomeIcon
          icon={['fas', 'arrow-left']}
          className="fa-xs fill-current w-4 h-4 mr-2 hover:mr-4"
        />
        <span>Go Back</span>
      </button>
    </div>
  </Layout>
)

export default NotFoundPage
