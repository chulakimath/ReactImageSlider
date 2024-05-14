import React from 'react'
import ImageSlider from './ImageSlider'

const ImageSliderMain = () => {
  return (
    <div>
        <ImageSlider url={'https://picsum.photos/v2/list'} limit={'10'} page={'1'} />
    </div>
  )
}

export default ImageSliderMain