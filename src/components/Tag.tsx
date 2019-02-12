import React from 'react'

const Tag = ({tag}) => (
    <span className="inline-block text-xs py-1 px-2 mt-0 mr-2 rounded-xl mb-1 ml-0 text-grey-darker bg-grey-lighter leading-none">
        {tag}
    </span>
)

export default Tag;