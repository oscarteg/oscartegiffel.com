import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => (
  <footer className="bg-white mt-24">
    <div className="max-w-lg mx-auto pt-2">
      <div className="md:flex mb-4 sm:text-center md:text-left">
        <div className="md:w-1/3 sm:mx-auto">
          <h4 className="font-mono uppercase tracking-wide text-xs py-3 font-hairline font-bold text-grey-dark">
            Frontend
          </h4>
          <ul className="tracking-wide font-hairline list-reset">
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>ES 5/6/7</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>React</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Vue 2</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>React Native</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>CSS (SCSS/SASS)</span>
            </li>
          </ul>
        </div>
        
        <div className="md:w-1/3">
          <h4 className="font-mono uppercase tracking-wide text-xs py-3 font-hairline font-bold text-grey-dark">
            Backend
          </h4>
          <ul className="tracking-wide font-hairline list-reset">
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>PHP (Laravel)</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Java</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>GoLang (beginner)</span>
            </li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h4 className="font-mono uppercase tracking-wide text-xs py-3 font-hairline font-bold text-grey-dark">
            Database/Devops
          </h4>
          <ul className="tracking-wide font-hairline list-reset">
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Docker</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Gitlab CI/CD</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Linux</span>
            </li>

            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>MySQL</span>
            </li>

            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Postgresql</span>
            </li>

            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Nginx/Apache</span>
            </li>
            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Vagrant</span>
            </li>

            <li>
              <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
              <span>Ansible</span>
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
