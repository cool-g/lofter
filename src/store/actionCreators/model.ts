import { AnyAction } from 'redux'
import * as ActionTypes from '../action-types'

// 修改主题风格  
export const changeModel = (data:boolean):AnyAction => {
    // 将改变的模式存入LocalStorage中
    window.localStorage.setItem("app_model",JSON.stringify(data));
    return {
        type:ActionTypes.SET_MODEL,
        data
    }
}