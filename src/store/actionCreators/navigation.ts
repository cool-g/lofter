import * as actionTypes from '../action-types'
import { AnyAction } from 'redux'
import { FindTabsType } from '@/models/index'

export const setChangeList = (data:FindTabsType[]):AnyAction => ({
    type:actionTypes.SET_CHANGE_LIST,
    data
})