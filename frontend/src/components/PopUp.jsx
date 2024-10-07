import React from 'react'

const PopUp = ({url,typee}) => {

  return (
    <div className='w-[700px] h-[500px] overflow-auto'>
      <iframe
        src={typee === 'youtube'? url: 'https://en.wikipedia.org/wiki/Science'}
        title="Embedded Website"
        className='w-full h-full'
        allowFullScreen
      ></iframe>

    </div>
  )
}

export default PopUp