import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Wrapper } from './style'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { rootState } from '@/store'
import { Tabs,PullToRefresh } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { getFindDataAction,addrecommendList,setLike } from '@/store/actionCreators/find'
import { FindTabsType } from '@/models/index'
import { findSwiperListType } from '@/models/swiper'
import CardInfo from '../../../components/cardInfo'
import { Swiper, SwiperSlide } from 'swiper/react';
import { getFindRecommendListRequest } from '@/api/request'
import Loading from '@/components/common/loading'
import BackTop from '@/components/common/backtop'

interface FindProps {
  model:boolean,
  tabList:FindTabsType[];
  swipers:findSwiperListType;
  recommendList:any;
  loading:boolean;
  getFindDataActionDispatch:()=>void;
  addRecommendListDispatch:(data:any[])=>void;
  setLikeDispatch:(data:any)=>void
}


const Find:React.FC<FindProps> = (props) => { 
    const { model,tabList,swipers,recommendList,loading } = props
    const { 
      getFindDataActionDispatch,
      addRecommendListDispatch,
      setLikeDispatch
    } = props
    const navigate = useNavigate()
    const [swiperInstance, setSwiperInstance] = useState<any>()
    const [activeIndex,setActiveIndex] = useState(0)
    const hascontent =[0,1,2]

    // 加载所有数据
    useEffect(() => {
      getFindDataActionDispatch()
    },[])    
    // 当tab切换导致页面index改变时，将页面跳转到指定
    useEffect(() => {
      if(swiperInstance&&activeIndex>=0){
        swiperInstance.slideTo(activeIndex,0)
      }
    },[activeIndex])

    const backtop =() => {
      window.scrollTo(0,0);
    }

    const TabList = tabList.map(item => 
        <Tabs.Tab title={item.name} key={item.key}/>
    )

    const CardContent = () => {
      return tabList.length ?
      <Swiper
        spaceBetween={50}
        loop={false}
        // 发生滑动时，将下标动态更新
        onActiveIndexChange={(swiperCore)=>{setActiveIndex(swiperCore.realIndex) }}
        navigation={true} 
        className="mySwiper2"
        // 非常重要，将swiper保存起来，当tab改变时可以调用里面的 slideTo 方法跳到指定swiper
        onSwiper={(swiper)=>
          setSwiperInstance(swiper)
        }
        // 解决每个页面高度不一致问题，自适应每个页面的高度
        // autoHeight={true}
      >
          { 
            tabList.map(item => 
              <SwiperSlide key={item.key}>
                { 
                  // 为推荐、视频、生活页
                  hascontent.indexOf(item.id) !== -1 &&
                  <CardInfo 
                    model={model}
                    swipers={swipers[item.key]} 
                    recommendList={maplist(item.key)}
                    loadMore={loadMore}
                    hasMore={hasMore(item.key)}
                    setlike={setlike}
                  />
                }
                {
                  hascontent.indexOf(item.id) == -1 &&
                  item.name
                } 
              </SwiperSlide> 
            )
          }
      </Swiper> : null     
    }
    // 是否加载更多
    const hasMore = (key:string) => {
      return key=='recommend' &&
        (maplist(key).left.length + maplist(key).right.length)<80
    }
    // 上拉加载更多
    async function loadMore() {
       await sleep(1500)
      const res = await getFindRecommendListRequest()
      addRecommendListDispatch(res.data.list);
    }
    // 添加喜欢作品
    const setlike = (id:number,liked:boolean) => {
      setLikeDispatch({id,liked})
    }

    // 将tabItem.key 与对应数据一一对应，实现传参
    const maplist = (key:string) => {
      switch(key){
        case 'recommend':
          return recommendList;
          break;
        default:
          return [];
      }
    }
    // 下拉刷新 重新加载所有数据
    async function doRefresh() {
      await sleep(1000)
      getFindDataActionDispatch()
    }

    return (
      <Wrapper>
        <PullToRefresh
          onRefresh={doRefresh}
        >
        {/* tab列表 */}
        { tabList.length &&
          <div className='card'>
            <Tabs
              // 活动状态下的key，与Tabs.Item传入的key一一对应，初始时activeIndex=0默认值，滑动页面时才会修改activeIndex
              activeKey={tabList[activeIndex]?tabList[activeIndex].key:'recommend'}
              className='tabs'
              onChange={key => {
                const index = tabList.findIndex(item => item.key === key)
                setActiveIndex(index)
              }}
              style={{
                '--content-padding':'5px 0px',
                '--title-font-size':'15px',
                '--active-line-color':'#010101f',
                '--active-title-color':`${model?'#000000':'#c9c9c9'}`
              }}
            >
              { TabList }
            </Tabs>
            <div className='switch' onClick={()=>navigate('/navigation')}>
              <i className='fa fa-bars'/>
            </div>
          </div> 
        }
        {/* 与tab同步的swiper */}
        { CardContent() }
      </PullToRefresh>  
      <BackTop backtop={backtop}/>
      {loading&&<Loading/>}
     </Wrapper>
    )
}

const mapStateToProps = (state:rootState) => ({
  model:state.model,
  tabList:state.find.tabList,
  swipers:state.find.swipers,
  recommendList:state.find.recommendList,
  loading:state.loading
})
const mapDispatchToProps = (dispatch:Dispatch) => ({
  // 加载首页所有数据
  getFindDataActionDispatch() {
    dispatch<any>(getFindDataAction())
  },
  // 无限滚动添加数据
  addRecommendListDispatch(data:any[]) {
    dispatch(addrecommendList(data))
  },
  // 添加喜欢作品
  setLikeDispatch(data:any) {
    dispatch(setLike(data))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(memo(Find))
