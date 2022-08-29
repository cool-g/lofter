import React, { memo } from 'react'
import { DotLoading } from 'antd-mobile'
import style from '@/assets/global-style'

import { Wrapper } from './style'

export default memo(function Loading() {
  return (
    <Wrapper>
      <div className='loading'>
        <span>loading...</span>
        <DotLoading color={`${style["primary_color"]}`} />
      </div>  
    </Wrapper>
  )
})
