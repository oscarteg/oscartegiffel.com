import React from 'react'
import Tag from './Tag'
import Img from 'gatsby-image'

const Card = ({ title, image, date, description, tags, slug }) => (
  <div className="card bg-white rounded shadow block flex-1 h-full" href={slug}>
    <Img fluid={image} className={'rounded-t'} />
    <div className="p-4 mt-4">
      <h3 className="my-1 text-xl inline-block text-black">{title}</h3>
      <p className="text-sm text-grey-darker">{date}</p>
      <p className="text-grey-darker my-4 text-base">{description}</p>

      {tags.map(tag => (
        <Tag tag={tag} />
      ))}
    </div>
  </div>
)

export default Card
