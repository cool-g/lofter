import { combineReducers,AnyAction } from 'redux'
import * as actionTypes from './action-types'
import { setSearchHistory_loc,formatData } from '@/utils/index'
import { setSearchResult } from './actionCreators/search'

const initalState = {
    // 界面主题颜色 日间/夜间 初始值先查看localStorage是否有值
    model:JSON.parse(window.localStorage.getItem('app_model')||'true'),
    // loading
    loading:true,
    // /home/find页面下数据
    find:{
        // 导航列表
        tabList:[],
        // 幻灯片列表
        swipers:{
            recommend:[],
            video:[],
            life:[]
        },
        // 推荐列表
        recommendList:{
            left:[],
            right:[]
        }
    },
    // 搜索页数据
    search:{
        swipers:[],
        suggestList:[],
        hotkey:[],
        searchHistory:[],
        resultList:[]
    },
    navigation:{
        changeList:[]
    }
}

const modelReducer = (state = initalState.model,action:AnyAction) => {
    switch(action.type) {
        case actionTypes.SET_MODEL: 
            return action.data
        default:
            return state
    }
}

// 设置喜欢作品/取消喜欢作品
const setLikeList = (list:any,data:any) => {
    let idx=list.left.findIndex((item:any)=>item.itemId==data.id)
    // 在左侧列表找到
    if(idx!==-1){
        data.liked?(list.left[idx].postData.postCount.favoriteCount--):
            (list.left[idx].postData.postCount.favoriteCount++);
        list.left[idx].favorite=!data.liked
    } // 不在左侧列表，在右侧列表
    else {
        idx=list.right.findIndex((item:any)=>item.itemId==data.id);
        data.liked?(list.right[idx].postData.postCount.favoriteCount--):
            (list.right[idx].postData.postCount.favoriteCount++);
        list.right[idx].favorite=!data.liked
    }
    return list;
}
// 添加推荐作品 做数组去重 平均分配到左右两边
type addtype = {
    left:any[],
    right:any[]
}
const addRecommend = (list:any,data:any[]):addtype => {   
    let arr=new Array();
    // 新数据去重  
    for(let i=0;i<list.left;i++){
        arr.push(list.left[i].itemId);
    }
    for(let i=0;i<list.right;i++){
        arr.push(list.right[i].itemId);
    }
    data=data.filter(item => {
        return arr.indexOf(item.itemId) === -1;
    })
    let newlist = formatData(data);
    // 合并
    return {
        left:[...list.left,...newlist.left],
        right:[...list.right,...newlist.right]
    };
}
const findReducer = (state = initalState.find,action:AnyAction) => {
    switch(action.type) {
        case actionTypes.SET_FIND_TABLIST:
            return {
                ...state,
                tabList:action.data
            }
        case actionTypes.SET_FIND_RECOMMEND_LIST:
            let format = formatData(action.data)
            return {
                ...state,
                recommendList:{
                    left:format.left,
                    right:format.right
                }
            }
        case actionTypes.SET_FIND_SWIPERS:
            return {
                ...state,
                swipers:{
                    recommend:action.data.recommend,
                    video:action.data.video,
                    life:action.data.life
                }
            }
        case actionTypes.ADD_FIND_RECOMMEND_LIST:
            return {
                ...state,
                recommendList:addRecommend(state.recommendList,action.data)
            }
        case actionTypes.SET_LIKE:
            return {
                ...state,
                recommendList:setLikeList(Object.assign({},state.recommendList),action.data)
            }
        default:
            return state
    }
}

const loadingReducer = (state = initalState.loading,action:AnyAction) => {
    switch(action.type) {
        case actionTypes.SET_LOADING:
            return action.data
        default:
            return state
    }
}

const addHist = (list:any[],str:any):any => {
    // 设置历史记录最多8条
    if(list.length>=8){
        list.pop();
    }
    // 从数组头部加入
    list.unshift(str);
    list = Array.from(new Set(list))
    // 持久化处理，放在LocalStrage中
    setSearchHistory_loc(list)
    // 数组去重 且保证最近加入的在前面
    return Array.from(list)
}
const searchReducer = (state = initalState.search,action:AnyAction) => {
    switch(action.type) {
        case actionTypes.SET_SEARCH_SWIPER:
            return {
                ...state,
                swipers:action.data
            }
        case actionTypes.SET_SEARCH_HOTKEY:
            return {
                ...state,
                hotkey:action.data
            }
        case actionTypes.SET_SEARCH_SUGGEST:
            return {
                ...state,
                suggestList:action.data
            }
        case actionTypes.SET_SEARCH_HISTORY:
            return {
                ...state,
                searchHistory:action.data
            }
        case actionTypes.ADD_SEARCH_HISTORY:
            return {
                ...state,
                searchHistory:addHist(Object.assign([],state.searchHistory),action.data)
            }
        case actionTypes.CLEAR_SEARCH_HISTORY:
            // 清空Localstorage
            setSearchHistory_loc([]);
            return {
                ...state,
                searchHistory:[]
            }
        case actionTypes.SET_SEARCH_RESULT:
            return {
                ...state,
                resultList:action.data
            }
        default:
            return state;
    }
}

const navigationReducer = (state = initalState.navigation,action:AnyAction) => {
    switch(action.type) {
        case actionTypes.SET_CHANGE_LIST:
            return {
                ...state,
                changeList:action.data
            }
        default:
            return state
    }
}

export default combineReducers({
    model:modelReducer,
    loading:loadingReducer,
    find:findReducer,
    search:searchReducer,
    navigation:navigationReducer
})