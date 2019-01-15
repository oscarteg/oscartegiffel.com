import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => (
  <footer className="bg-white mt-24">
    <div className="max-w-lg mx-auto pt-2">
      <div className="md:flex mb-4">
        <div className="md:w-1/3 sm:mx-auto">
          <h4 className="font-mono uppercase tracking-wide text-xs py-3 font-hairline font-bold">
            Webdevelopment
          </h4>
          <ul className="tracking-wide font-hairline list-reset">
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>Javascript</span>
            </li>
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>PHP</span>
            </li>
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>Laravel</span>
            </li>
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>React</span>
            </li>
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>Vue</span>
            </li>
          </ul>
        </div>
        <div className="md:w-1/3">
          <h4 className="font-mono uppercase tracking-wide text-xs py-3 font-hairline font-bold">
            Devops
          </h4>
          <ul className="tracking-wide font-hairline list-reset">
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>Docker</span>
            </li>
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>Gitlab CI/CD</span>
            </li>
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>Linux</span>
            </li>
          </ul>
        </div>
        <div className="md:w-1/3">
          <h4 className="font-mono uppercase tracking-wide text-xs py-3 font-hairline font-bold">
            Mobile
          </h4>
          <ul className="tracking-wide font-hairline list-reset">
            <li>
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
              <span>React Native</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center text-grey font-hairline text-sm">
        {/* <FontAwesomeIcon icon={['fab', 'linkedin']} /> */}
        <div className="ml-2">© Copyright - {new Date().getFullYear()}</div>
      </div>
    </div>
  </footer>
)

export default Footer
