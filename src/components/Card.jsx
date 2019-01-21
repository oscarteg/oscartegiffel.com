import React from 'react'
import Tag from './Tag'
import Img from 'gatsby-image'

const Card = ({ title, image, description, tags, slug }) => (
  <div className="card bg-white rounded shadow block flex-1 h-full border-b-2 border-yellow-dark" href={slug}>
    <div className="thumbnail-container overlay">
      <Img fluid={image} className={'thumbnail'} />
    </div>
    <div className="p-4 mt-4">
      <h3 className="my-1 text-xl inline-block text-black">{title}</h3>
      <p className="text-grey-darker my-4 text-base">{description}</p>

      {tags.map(tag => (
        <Tag tag={tag} key={tag} />
      ))}
    </div>
  </div>
)

export default Card
