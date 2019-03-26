import * as React from 'react'
import Tag from './Tag'
import Img, { GatsbyImageProps } from 'gatsby-image'


interface CardProps {
  title: string,
  image: GatsbyImageProps,
  description: string,
  tags: Array<string>
}

const Card: React.StatelessComponent<CardProps> = ({
  title,
  image,
  description,
  tags,
}) => (
  <div
    className="card bg-white rounded shadow block flex-1 h-full border-b-2 border-yellow-light"
  >
    <div className="thumbnail-container overlay">
      <Img fluid={image.childImageSharp.fluid} className={'thumbnail'} alt={title} />
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
