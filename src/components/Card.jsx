import React from 'react'
import Tag from './Tag'
import Img from 'gatsby-image'

const Card = ({ title, image, date, description, tags, slug}) => (
  <div className="card mx-auto p-4 max-w-sm mb-8 bg-white rounded-lg shadow block" href={slug}>
    <Img fixed={image} className={"rounded-lg"}/>
    <h3 className="my-1 text-xl inline-block text-black">
      {title}
    </h3>
    <span className="text-sm text-grey-darker"> - 25.09.2018</span>
        <p className="text-grey-darker my-4 text-base">
      With the recent release of Babel 7, it's the perfect time to really get to
      know it. A post on what Babel is, what it does and how to use it.
    </p>
    <Tag tag="Javascript" />
  </div>
)

export default Card
