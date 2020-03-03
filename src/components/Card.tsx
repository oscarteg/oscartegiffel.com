import * as React from 'react'
import Tag from './Tag'
import Img, { GatsbyImageProps } from 'gatsby-image'

interface CardProps {
  title: string
  image: GatsbyImageProps
  description: string
  tags: Array<string>
}

const Card: React.StatelessComponent<CardProps> = ({
  title,
  image,
  description,
  tags,
}) => (
  <div className="card bg-white rounded shadow block flex-1 border-b-2 border-yellow-200 h-full">
    <div className="thumbnail-container overlay">
      <div className="absolute w-4/5 -mt-10 left-0 right-0 mx-auto image-overlay">
        <Img
          className=""
          fluid={image.childImageSharp.fluid}
          className={'thumbnail'}
          alt={title}
        />
      </div>
    </div>
    <div className="p-4 mt-4 pt-32 md:pt-64 ">
      <h3 className="my-1 text-xl inline-block text-black">{title}</h3>
      <p className="text-gray-600 my-4 text-base">{description}</p>

      {tags.map(tag => (
        <Tag tag={tag} key={tag} />
      ))}
    </div>
  </div>
)

export default Card
