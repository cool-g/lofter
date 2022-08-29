import React, { memo } from 'react'
import './style.css'

interface backTopProps {
  backtop:()=>void;
}
const BackTop:React.FC<backTopProps> = ({backtop}) => {
  return (
    <>
      <div className='back-top' onClick={backtop}>
        <i className='fa fa-chevron-up'></i>
      </div>
    </>
  )
}

export default memo(BackTop)