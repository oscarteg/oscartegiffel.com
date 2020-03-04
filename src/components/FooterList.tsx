import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FooterList = ({ title, items }) => (
  <div className="px-5 md:w-1/3">
    <h4 className="font-mono uppercase tracking-wide text-xs py-3 font-hairline font-bold text-grey-600">
      {title}
    </h4>
    <ul className="tracking-wide font-hairline list-reset">
      {items.map(item => (
        <li key={item}>
          <FontAwesomeIcon icon={['fas', 'check']} className="fa-xs" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default FooterList
