import React, { memo,useState,useCallback,useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useNavigate } from 'react-router';
import { Container,ShortcutWrapper,HotKey,List } from './style'
import SearchBox from '@/components/common/search-box'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { rootState } from '@/store'
import SwiperList from '@/components/common/swiper'
import { swiperType } from '@/models/swiper'
import { rankList,hotLists } from '@/models/search'
import { 
    getSearchDataAction,
    getSearchSuggest,
    clearSearchHistory,
    getSearchResult
} from '@/store/actionCreators/search'
import Loading from '@/components/common/loading'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tabs } from 'antd-mobile'
import { formatTenThousand } from '@/utils/index'
import CardInfo from '@/components/cardInfo'

interface SearchProps {
    model:boolean;
    searchHistory:string[];
    swipers:swiperType[];
    loading:boolean;
    hotkey:rankList[];
    suggestList:any[];
    resultList:any
    getSearchDataActionDispatch:()=>void;
    getSearchSuggestDispatch:(query:string)=>void;
    clearSearchHistoryDispatch:()=>void;
    getSearchResultDispatch:(data:string)=>void;
}

const Search:React.FC<SearchProps> = (props) => {
    const navigate = useNavigate()
    const { 
        model,
        searchHistory,
        swipers,
        loading,
        hotkey,
        suggestList,
        resultList
    } = props
    const { 
        getSearchDataActionDispatch,
        getSearchSuggestDispatch,
        clearSearchHistoryDispatch,
        getSearchResultDispatch
     } = props
    const [show,setShow] = useState(false);
    const [swiperInstance, setSwiperInstance] = useState<any>();
    const [activeIndex,setActiveIndex] = useState<number>(0)
    const [query,setQuery] = useState<string>('');
    const [showres,setShowres] = useState(false)
    // 退出搜索页面
    const searchBack = useCallback(()=> {
        setShow(false)
    },[])

    const handleQuery = (q:string)=>{
        setQuery(q)
    }
    // 清空搜索记录
    const clearHistory = () => {
        clearSearchHistoryDispatch()
    }
    // 根据key搜索
    const dosearch = (key:string) => {
        getSearchResultDispatch(key)
        setQuery(key)
        setShowres(true)
    }

    const onfocus = () => {
        setShowres(false)
    }

    useEffect(() => {
        setShow(true);
        setShowres(false);
        // 加载页面数据
        if(!hotkey.length) {
            getSearchDataActionDispatch();
        }
    },[])

    // useEffect(()=>{
    //     // 当页面卸载时将搜索记录存入Localstorage
    //     return ()=>{
    //         if(searchHistory.length>0){
    //             console.log(searchHistory)
    //         setSearchHistory_loc(searchHistory) 
    //         }
    //     }
    // },[searchHistory])

    // 当tab切换导致页面index改变时，将页面跳转到指定
    useEffect(() => {
        if(swiperInstance&&activeIndex>=0){
            swiperInstance.slideTo(activeIndex,0)
        }
    },[activeIndex])

    // 请求搜索建议数据
    useEffect(() => {
        if(query.trim()){ 
            // 有必要去请求
            getSearchSuggestDispatch(query);
        }
        if(query==''){
            setShowres(false)
        }
    },[query])

    const tabList = () => (
        <div className='tab'>
        <Tabs
        // 活动状态下的key，与Tabs.Item传入的key一一对应，初始时activeIndex=0默认值，滑动页面时才会修改activeIndex
        activeKey={`${activeIndex}`}
        className='tabs'
        onChange={key => {
          setActiveIndex(Number(key))
        }}
        style={{
          '--content-padding':'5px 0px',
          '--title-font-size':'14px',
          '--active-line-color':'#010101f',
          '--active-title-color':`${model?'#000000':'#c9c9c9'}`
        }}
      >
        { hotkey.map((item,index) => 
            <Tabs.Tab title={item.listName} key={index}/> )
        }
      </Tabs>
      </div>
    )

    const hotkeyContent = () => {
        return hotkey.length ?
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
            autoHeight={true}
            // slidesPerView="auto"
        >
            { 
              hotkey.map((item) => 
                <SwiperSlide key={item.sortNo}>
                  {randList(item.hotLists)}
                </SwiperSlide> 
              )
            }
        </Swiper> : null     
      }

    const showcolor = (index:number):React.CSSProperties=>
        index<3?{color:'#fd6d90'}:{color:'#b5b5b5'};

    const randList = (hotList:hotLists[]) => {
        return hotList.length ? 
        <List model={model}>
            { hotList.map((item,index) => 
                 <div className='listItem' key={item.blogId+index} 
                    onClick={()=>dosearch(item.title)}>
                    <div>
                        <span className='listItem_rank' style={showcolor(index)}>{index+1}</span>
                        {item.img?<img src={item.img} className='listItem_pic'/>:null}
                        <span className='listItem_title'>{item.title}</span>
                        {item.icon?<img src={item.icon} className='listItem_icon'/>:null}
                    </div>
                    <div className='listItem_score'>{item.score}</div>
                 </div>   
            )}
        </List>
         : null
    }
 
    // 搜索记录列表
    const historySearchList =() => {
        return searchHistory.length ?
        <div className='history'>
            <p>
                <span>最近搜索</span>
                <i className='fa fa-trash-o' onClick={clearHistory}/>
            </p>
            <div className='content'>
            {searchHistory.map((item,index) =>
                    <span key={item+index} onClick={()=>dosearch(item)}>{item}</span>
                )
            }
            </div>
        </div> : null
    }

    const suggestElement = () => {
        return (suggestList!==undefined&&suggestList.length>0) ?
        <List model={model}>
            { suggestList.map((item,index) => 
                (item.type==0||item.type==1||item.type==2)&&
                <div className='listItem' key={index} 
                    onClick={()=>{if(item.type!==2) dosearch(item.tagInfo.tagName)}}>
                    <div>
                        { (item.type==0||item.type==1)&&
                            <span className='listItem_rank'>
                                {item.type==0?<i>#</i>:<i className='fa fa-search'/>}
                            </span>
                        }
                        {
                            item.type!==2?<span className='listItem_title'>{item.tagInfo.tagName}</span>
                            : 
                            <div className='listItem_userInfo'>
                                <img src={item.blogData.blogInfo.bigAvaImg} className='listItem_pic'/>
                                <div className='title'>
                                    <span className='listItem_title'>{item.blogData.blogInfo.blogNickName}</span>
                                    <p>ID:{item.blogData.blogInfo.blogName}&nbsp;&nbsp;
                                    文章:{item.blogData.blogCount.publicPostCount}&nbsp;&nbsp;
                                    粉丝:{formatTenThousand(item.blogData.blogCount.followerCount)}
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    {   item.type==0 &&
                        <div className='listItem_score'>{item.tagInfo.joinCount} 参与</div>
                    }
                </div>
            )} 
        </List> :null
    }

    return (
        <CSSTransition
                in={show}
                timeout={300}
                appear={true}
                classNames="fly"
                unmountOnExit
                onExit={() => {navigate(-1)}}
            >
        <Container model={model}>
            <div className='searchBar'>
                    <SearchBox 
                        model={model}
                        handleQuery={handleQuery}
                        newQuery={query}
                        handleEnterKey={dosearch}
                        onfocus={onfocus}
                    />
                    <span onClick={searchBack}>取消</span>
            </div>
            <ShortcutWrapper show={!showres&&query==''}>
                <HotKey  model={model}>
                    {/* 搜索记录 */}
                    { historySearchList() }
                    {/* 轮播图 */}
                    { swipers.length ? <SwiperList list={swipers}/> :null}
                    { tabList() }
                    { hotkeyContent() }
                </HotKey>
            </ShortcutWrapper>
            <ShortcutWrapper show={!showres&&query!==''}>
                { suggestElement() }
            </ShortcutWrapper>
            <ShortcutWrapper show={showres&&query!==''} model={model}>
                <h2>搜索结果：</h2>
                <CardInfo 
                    model={model}
                    resList={resultList}
                  />
            </ShortcutWrapper>
            {loading&&<Loading/>}
        </Container>
        </CSSTransition>
    )
}

const mapStatetoProps = (state:rootState) => ({
    model:state.model,
    searchHistory:state.search.searchHistory,
    swipers:state.search.swipers,
    hotkey:state.search.hotkey,
    loading:state.loading,
    suggestList:state.search.suggestList,
    resultList:state.search.resultList
  })
const mapDispatchToProps = (dispatch:Dispatch) => ({
    getSearchDataActionDispatch() {
        dispatch<any>(getSearchDataAction())
    },
    getSearchSuggestDispatch(data:string) {
        dispatch<any>(getSearchSuggest(data))
    },
    // addSearchHistoryDispatch(data:string) {
    //     dispatch(addSearchHistory(data))
    // },
    clearSearchHistoryDispatch() {
        dispatch(clearSearchHistory())
    },
    getSearchResultDispatch(data:string) {
        dispatch<any>(getSearchResult(data))
    }
})
export default connect(mapStatetoProps,mapDispatchToProps)(memo(Search))