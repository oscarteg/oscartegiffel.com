import React from 'react'

function hashCode(string) {
  var h = 0,
    l = string.length,
    i = 0
  if (l > 0) while (i < l) h = ((h << 5) - h + string.charCodeAt(i++)) | 0
  return h
}

const colors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
]

export default function Tag({ tag }: { tag: string }) {
  const colorIndex = Math.abs(hashCode(tag)) % colors.length
  const color = colors[colorIndex]

  return (
    <span
      className={`inline-block text-xs py-1 px-2 mt-0 mr-2 rounded mb-1 ml-0 text-${color}-800 bg-${color}-200 leading-none`}
    >
      {tag}
    </span>
  )
}
