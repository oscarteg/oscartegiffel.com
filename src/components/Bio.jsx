import React from 'react'

const Bio = () => (
  <div className="flex-wrap text-center md:text-left md:flex-no-wrap w-full mx-auto max-w-full shadow rounded-lg py-8 px-4 md:p-4 flex mt-8 md:mt-16 mb-4 items-center bg-grey-lighter">
    <div className="md:mr-12 flex-no-shrink w-full md:w-auto">
      <img
        src="https://i.imgur.com/oW1dGDI.jpg"
        alt="Jan D'Hollander"
        className="rounded-full mb-0 bio-pic m-h-full"
        style={{maxWidth: "100px"}}
      />
    </div>
    <div className="content">
      <p className="my-4">
        Hallo, Ik ben  <strong>Oscar te Giffel</strong>.<br />
        Webdeveloper die nooit iets afmaakt . 
      </p>
    </div>
  </div>
)

export default Bio
