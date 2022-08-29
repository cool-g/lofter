import React, { memo } from 'react'
import { swiperType } from '@/models/swiper'
import { Wrapper } from './style'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Autoplay } from "swiper";
import "swiper/css/pagination";

interface SwiperProps {
    list:swiperType[];
}

const SwiperList:React.FC<SwiperProps> = (props) => {
    const { list } = props
    const swiperList = list.map((item,index) => 
        <SwiperSlide key={item.id+index}>
            <img src={item.img} className='content'></img>
        </SwiperSlide>
    )

    return (
        <Wrapper>
            {/* 图片为1张以上图片，以swiper显示 */}
            { list.length>1 &&
                <Swiper
                    spaceBetween={50}
                    modules={[Pagination,Autoplay]}
                    pagination={{
                        dynamicBullets: true,
                      }}
                    loop={true}
                    className="mySwiper1"
                    autoplay={true}
                    // noSwipingClass='content'
                >
                    {swiperList}
                </Swiper>
            }
            {/* 为单张图片，直接以图片显示 */}
            {
                list.length==1 && 
                <img src={list[0].img} className='content'>
                </img>
            }
        </Wrapper>
    )
}

export default memo(SwiperList)