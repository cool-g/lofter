import React, { memo } from 'react'
import SwiperList from '@/components/common/swiper'
import { swiperType } from '@/models/swiper'
import { Wrapper,ContentWrapper,Column,RecommendItem } from './style'
import LazyLoad from 'react-lazyload'
import defaultImg from '@/assets/images/default.jpg'
import defaultImg_dark from '@/assets/images/default-dark.jpg'
import { formatTenThousand,titleDelTag } from '@/utils/index'
import MyImg from '@/components/common/myImg'
import { InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'

interface CardInfoProps {
  model:boolean;
  swipers?:swiperType[];
  recommendList?:any;
  resList?:any[];
  loadMore?:(isRetry: boolean) => Promise<void>;
  hasMore?:boolean;
  setlike?:(id:number,liked:boolean)=>void;
}

const CardInfo:React.FC<CardInfoProps> = (props) => {
  const { swipers,recommendList={},hasMore=false,model,resList=[] } = props
  const { 
    loadMore=async ()=>{await sleep(1000)},
    setlike=()=>{}
  } = props

  const recommendElement = (list:any[]) => {
  return (list!==undefined && list.length>0) &&
    list.map((item,index) => {
    return item.postData!==null&&
        <RecommendItem key={item.itemId+index} 
            model={model}
            // 传入图片宽高比例，决定图片容器长度
            imgHeight={item.postData.postView.type==1?0:
            Math.floor(item.postData.postView.firstImage.oh/item.postData.postView.firstImage.ow)}>
          {
            // 数据type=1，为小说，小说阅读形式展示
            item.postData.postView.type==1 &&
            <div className='recommend-item-Article'>
              <p className='article-title' dangerouslySetInnerHTML =
              {{ __html:titleDelTag(item.postData.postView.title)}}>
                {/* {titleDelTag(item.postData.postView.title)} */}
              </p>
              <p className="article-content" dangerouslySetInnerHTML = 
                  {{ __html:titleDelTag(item.postData.postView.digest)}}>
              </p>
            </div>
          }
          {
            // type=2,图片内容，type=3视频内容
            item.postData.postView.type!==1 &&
            <>
              <div className='img_container'>
                <LazyLoad 
                      placeholder={<img className='img' src={model?defaultImg:defaultImg_dark}/>}>
                      <MyImg className='img'
                        src={item.postData.postView.firstImage.orign} 
                        defaultImg={model?defaultImg:defaultImg_dark}/>
                </LazyLoad>
              </div>
              <div className='recommend-item-title'>
              {/* 标题数据去除标签<p></p> */}
              <p dangerouslySetInnerHTML = 
               {{ __html:titleDelTag(item.postData.postView.digest)}}>
                {/* {titleDelTag(item.postData.postView.digest)} */}
                </p>
              <span>
                <i className='fa fa-ellipsis-v '/>
              </span>
              </div>
            </>
    
          }
          <div className='recommend-item-label'>#{item.postData.postView.tagList[0]}</div>
          <div className='recommend-item-bt'>
            <div className='author-info'>
              <LazyLoad 
                    placeholder={<img className='img' src={model?defaultImg:defaultImg_dark}/>}>
                    <MyImg className='img'
                      src={item.blogInfo.bigAvaImg} defaultImg={model?defaultImg:defaultImg_dark}/>
              </LazyLoad>
              <p>{item.blogInfo.blogNickName}</p>
            </div>
            <div className='like-count' onClick={()=>setlike(item.itemId,item.favorite)}>
              { item.favorite 
                ? <i className='fa fa-heart  '/>
                : <i className='fa fa-heart-o '/>
              }
              {/* 点赞数过万，以xx.w形式展示 */}
              <span>{formatTenThousand(item.postData.postCount.favoriteCount)}</span>
            </div>
          </div>
        </RecommendItem>
  })}

  return (
    <Wrapper>
        {/* 幻灯片 */}
        { 
          swipers&&swipers.length && <SwiperList list={swipers}/>
        }
        {/* 瀑布流布局推荐列表 flex实现*/}
        {   recommendList['left']&&recommendList.left.length>0 &&
            <ContentWrapper flex={true}>
            <Column>
              {recommendElement(recommendList.left)}
            </Column>
            <Column>
              {recommendElement(recommendList.right)}
            </Column>
          </ContentWrapper>
        }
        { resList.length>0 &&
          <ContentWrapper flex={false}>
            {recommendElement(resList)}
          </ContentWrapper>
        }
        {
          recommendList!==undefined && recommendList.length==0 && <div style={{height:'200px'}}>11111</div>
        }
        {/* 上拉加载更多 */}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={100}/>
    </Wrapper>
  )
}

export default memo(CardInfo)