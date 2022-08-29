import * as actionTypes from '../action-types'
import { AnyAction, Dispatch } from 'redux'
import {
    getSearchSwipersRequest,
    getSearchHotKeyRequest,
    getSearchSuggestRequest,
    getSearchResultRequest
} from '@/api/request'
import { swiperType } from '@/models/swiper'
import { rankList } from '@/models/search'
import { getSearchHistory_loc } from '@/utils'

// 异步
// Promise.all全部加载完成
export const getSearchDataAction = () => {
    return (dispatch:Dispatch) => {
        dispatch(setLoading(true))
        return Promise.all([
            getSearchSwipersRequest(),
            getSearchHotKeyRequest()
        ]).then(([swiperResult,hotkeyResult]) => {
            dispatch(setSearchSwiper(swiperResult))
            dispatch(setSearchHotkey(hotkeyResult))
            // 打开搜索页面时，从LocalStorage读取搜索记录内容
            dispatch(setSearchHistory(getSearchHistory_loc()))
            dispatch(setLoading(false))
        })
    }
}
// 获取搜索建议
export const getSearchSuggest = (data:string) => {
    return (dispatch:Dispatch) => {
        getSearchSuggestRequest(data)
            .then(res => {
                dispatch(setSearchSuggest(res.data.items))
            })
    }
}
// 获取搜索结果
export const getSearchResult = (data:string) => {
    return (dispatch:Dispatch) => {
        dispatch(setLoading(true))
        // 将搜索关键字加入搜索列表中
        dispatch(addSearchHistory(data))
        // 拉取搜索结果
        getSearchResultRequest(data)
            .then(res => {
                dispatch(setSearchResult(res.data))
                dispatch(setLoading(false))
            })
}}

// 同步
export const setLoading = (data:boolean):AnyAction => ({
    type:actionTypes.SET_LOADING,
    data
})

export const setSearchSwiper = (data:swiperType[]):AnyAction => ({
    type:actionTypes.SET_SEARCH_SWIPER,
    data
})

export const setSearchHotkey = (data:rankList[]):AnyAction => ({
    type:actionTypes.SET_SEARCH_HOTKEY,
    data
})

export const setSearchSuggest= (data:any[]):AnyAction => ({
    type:actionTypes.SET_SEARCH_SUGGEST,
    data
})
// 获取搜索记录(从localStorage中读取)
export const setSearchHistory = (data:string[]):AnyAction => ({
    type:actionTypes.SET_SEARCH_HISTORY,
    data
})
// 增加历史搜索记录
export const addSearchHistory = (data:string):AnyAction => ({
    type:actionTypes.ADD_SEARCH_HISTORY,
    data
})
// 清空历史记录
export const clearSearchHistory = ():AnyAction => ({
    type:actionTypes.CLEAR_SEARCH_HISTORY
})

export const setSearchResult = (data:any[]):AnyAction => ({
    type:actionTypes.SET_SEARCH_RESULT,
    data
})