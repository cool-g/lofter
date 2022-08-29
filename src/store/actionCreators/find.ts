import * as actionTypes from '../action-types'
import { AnyAction, Dispatch } from 'redux'
import {
    getFindTabsRequest,
    getFindRecommendListRequest,
    getFindSwipersRequest
} from '@/api/request'
import { FindTabsType } from '@/models/index'
import { findSwiperListType } from '@/models/swiper'

// 异步
// Promise.all全部加载完成
export const getFindDataAction = () => {
    return (dispatch:Dispatch) => {
        dispatch(setLoading(true))
        return Promise.all([
            getFindTabsRequest(),
            getFindSwipersRequest(),
            getFindRecommendListRequest()  
        ]).then(([tabListResult,swiperResult,recommendListResult]) => {
            // tablist先在LocalStorage中查找，若存在则使用本地值
            tabListResult =
                JSON.parse(window.localStorage.getItem('tab_list')||'[]').length>0?
                JSON.parse(window.localStorage.getItem('tab_list')||'[]'):tabListResult;
            dispatch(setTabList(tabListResult))
            dispatch(setFindSwipers(swiperResult))
            dispatch(setFindRecommendList(recommendListResult.data.list))
            dispatch(setLoading(false))
        })
    }
} 
// 添加推荐数据
export const addRecommendListAction = () => {
    return (dispatch:Dispatch) => {
        getFindRecommendListRequest()
            .then(recommendListResult => {
                dispatch(addrecommendList(recommendListResult.data.list))
            })
    }
}

// 同步
export const setLoading = (data:boolean):AnyAction => ({
    type:actionTypes.SET_LOADING,
    data
})

export const setTabList = (data:FindTabsType[]):AnyAction => ({
    type:actionTypes.SET_FIND_TABLIST,
    data
})

export const setFindRecommendList = (data:any[]):AnyAction => ({
    type:actionTypes.SET_FIND_RECOMMEND_LIST,
    data
})

export const setFindSwipers = (data:findSwiperListType):AnyAction => ({
    type:actionTypes.SET_FIND_SWIPERS,
    data
}) 

export const addrecommendList = (data:any[]):AnyAction => ({
    type:actionTypes.ADD_FIND_RECOMMEND_LIST,
    data
})

export const setLike = (data:any):AnyAction => ({
    type:actionTypes.SET_LIKE,
    data
})