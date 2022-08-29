import React,{ memo } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { FooterWrapper } from './style'
import classnames from 'classnames'
import { isPathPartlyExisted } from '@/utils'

interface FooterProps {
  model:boolean
}

const Footer:React.FC<FooterProps> = (props) => {
  const { pathname } = useLocation()
  const { model } = props
  const arr = ['/search','/navigation'];
  // 在特定页面不显示底部导航栏
  if(isPathPartlyExisted(arr,pathname)) return null;

  return (
    <FooterWrapper model={model}>
      <Link to="/home" className={classnames({active:pathname.indexOf('/home')!==-1})} >
        <i className='fa fa-home'></i>
        <span>首页</span>
      </Link>
      <Link to="/follow" className={classnames({active:pathname=='/follow'})}>
        <i className='fa fa-podcast'></i>
        <span>关注</span>
      </Link>
      <div className='add'>
          <div>
           <i className='fa fa-plus '/>
          </div>
      </div>
      <Link to="/shop" className={classnames({active:pathname=='/shop'})}>
        <i className='fa fa-book'></i>
        <span>集市</span>
      </Link>
      <Link to="/mine" className={classnames({active:pathname=='/mine'})}>
        <i className='fa fa-user'></i>
        <span>我的</span>
      </Link>
    </FooterWrapper>
  )
}

export default memo(Footer)