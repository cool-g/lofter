import { axiosInstance } from './config'
import { AxiosResponse } from 'axios'
import {
    URL_FIND_TABS,
    URL_FIND_RECOMMEND,
    URL_FIND_SWIPERS,
    URL_SEARCH_SWIPERS,
    URL_SEARCH_HOTKEY,
    URL_SEARCH_SUGGEST,
    URL_SEARCH_RESULT
} from './url'
import { FindTabsType} from '@/models/index'
import { findSwiperListType,swiperType } from '@/models/swiper'
import { rankList } from '@/models/search'

// 获取发现页导航列表
export const getFindTabsRequest = ():Promise<FindTabsType[]> => {
    const promise = new Promise<FindTabsType[]>((resolve,reject) => {
        try {
            axiosInstance.get(URL_FIND_TABS).then(  
                response => resolve(mapFindTabList(response))
            )
        } catch(e) {
            reject(e)
        }
    })
    
    return promise
}
// 将AxiosResponse类型转为FindTabsType[]类型
const mapFindTabList = 
    ({data}:AxiosResponse<FindTabsType[]>):FindTabsType[] => 
        data.map(list => ({
            id:list.id,
            key:list.key,
            name:list.name
        }))

// 获取发现页推荐列表
export const getFindRecommendListRequest = 
        () => axiosInstance.get(URL_FIND_RECOMMEND)

// 获取发现页轮播图列表
export const getFindSwipersRequest = ():Promise<findSwiperListType> => {
    const promise = new Promise<findSwiperListType>((resolve,reject) => {
        try{
            axiosInstance.get(URL_FIND_SWIPERS).then(
                response => resolve(mapFindSwiperList(response))
            )
        } catch(e) {
            reject(e)
        }
    })
    return promise
}
//将AxiosResponse类型转为findSwiperListType类型
const mapFindSwiperList = 
    ({data}:AxiosResponse<findSwiperListType>):findSwiperListType => {
        const newSwiper = {
            recommend:data.recommend,
            video:data.video,
            life:data.life
        }
        return newSwiper
    }


// 获取搜索页轮播图列表
export const getSearchSwipersRequest = ():Promise<swiperType[]> => {
    const promise = new Promise<swiperType[]>((resolve,reject) => {
        try{
            axiosInstance.get(URL_SEARCH_SWIPERS).then(
                response => resolve(mapSwiperList(response))
            )
        } catch(e) {
            reject(e)
        }
    })
    return promise
}
//将AxiosResponse类型转为swiperType[]类型
const mapSwiperList = 
    ({data}:AxiosResponse<swiperType[]>):swiperType[] => 
        data.map(item => ({
            id:item.id,
            img:item.img
        }))

// 获取搜索排行榜热词
export const getSearchHotKeyRequest = ():Promise<rankList[]> => {
    const promise = new Promise<rankList[]>((resolve,reject) => {
        try{
            axiosInstance.get(URL_SEARCH_HOTKEY).then(
                response => resolve(mapHotkeyList(response))
            )
        } catch(e) {
            reject(e)
        }
    })
    return promise
}
const mapHotkeyList= 
    ({data}:AxiosResponse):rankList[] => 
        data.rankList.map((item:rankList) => ({
            listName:item.listName,
            sortNo:item.sortNo,
            hotLists:item.hotLists
    }))

// 获取搜索建议列表 
export const getSearchSuggestRequest = 
        (w:string) => {
            let newUrl = URL_SEARCH_SUGGEST.replace('{w}',w)
            return axiosInstance.get(newUrl)
        }

// 搜索结果数据
export const getSearchResultRequest = 
    (w:string) => {
        let newUrl = URL_SEARCH_RESULT.replace('{w}',w)
        // console.log(newUrl)
        return axiosInstance.get(newUrl)
    }