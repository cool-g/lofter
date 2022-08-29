import React, { memo,useEffect, useState,useCallback } from 'react'
import { useNavigate,Outlet,Link } from 'react-router-dom'
import { Wrapper,NavBar } from './style'
import { connect } from 'react-redux'
import { rootState } from '@/store'
import classnames from 'classnames'
import SearchBox from '@/components/common/search-box'
import { throttle } from '@/utils'

interface HomeProps {
  model:boolean
}

const Home:React.FC<HomeProps> = (props) => {
  const navigate = useNavigate()
  const { model } = props
  const [ ontab,setOntab ] = useState('发现')
  const [showSearch,setShowSearch] = useState(false)

  // 使用useCallback，外层组件每次更新都复用上次函数
  const setScroll = useCallback(()=>{
    if (window.pageYOffset > 100) { // 100 为页面滚到的位置，可自定义
        setShowSearch(true)
    } else {
        setShowSearch(false)
    }
  },[])

  useEffect(()=>{
    navigate(`/home/find`)
    // 监听页面滚动 加上事件防抖，避免频繁触发
    window.document.addEventListener('scroll',throttle(setScroll,500))
    // 退出页面时 销毁监听
    return () => {
      window.removeEventListener("scroll", setScroll);
    };
  },[])
 
  return (
    <Wrapper>
        <NavBar model={model} showSearch={showSearch}>
          <Link to="find">
            <li className={classnames({active:ontab=='发现'})} 
              onClick={()=>setOntab('发现')}>发现</li>
          </Link>
          <Link to="granary">
            <li className={classnames({active:ontab=='粮仓'})} 
              onClick={()=>setOntab('粮仓')}>粮仓</li>
          </Link>
          <i className='fa fa-search' onClick={()=>navigate('/search')}/>
        </NavBar>
        <div onClick={()=>navigate('/search')} className="searchbox">
          <SearchBox model={model}/>
          <div className='fixed'></div>
        </div>
        <Outlet/>
    </Wrapper>
  )
}

const mapStatetoProps = (state:rootState) => ({
  model:state.model
})

export default connect(mapStatetoProps)(memo(Home))
