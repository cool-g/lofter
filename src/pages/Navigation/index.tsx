import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import style from '@/assets/global-style'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import Changelist from './Changelist'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { rootState } from '@/store'
import { FindTabsType } from '@/models/index'
import { setChangeList } from '@/store/actionCreators/navigation'
import { setTabList } from '@/store/actionCreators/find'


const Wrapper = styled.div<{model:boolean}>`
    color:${props=>props.model?
        style.font_color_dark:style.font_color_light};
    /* display:relative; */
    .nav{
        height:44px;
        display:flex;
        justify-content:center;
        align-items:center;
        .nav_title {
            font-size:16px;
            font-weight:bold;
        }
        .nav_on{
            position:absolute;
            right:0px;
            padding-right:10px;
            span{
                color:${style.primary_color};
                margin-right:20px;
                font-size:14px;
                font-weight:bold;
                position:relative;
                top:3px;
            }
        }
        .fa-chevron-down{
            font-size:16px;
            float:right;
            margin-right:10px;
        }
    }
    ul{
        margin-left:20px;
        .sug {
            color:${style.font_color};
            font-size:14px;
            height:26px;
            line-height:30px;
        }
        .top {
            height:53px;
            line-height:53px;
            font-size:18px;            
        }
    }
`

interface NavigationProps {
    model:boolean;
    tabList:FindTabsType[];
    changelist:FindTabsType[];
    setlistDispatch:(data:FindTabsType[])=>void;
    setTabListDispatch:(data:FindTabsType[])=>void;
}

const Navigation:React.FC<NavigationProps> = (props) => {
    const navigate = useNavigate()
    const { model,tabList,changelist } =props
    const { setlistDispatch,setTabListDispatch } = props
    const doChanged = (newlist:FindTabsType[]) =>{
        setlistDispatch(newlist)
    }
    const doFinish = () => {
        setTabListDispatch(changelist)
        // 持久化处理 存入localStorage
        window.localStorage.setItem("tab_list",
            JSON.stringify(changelist));
        Toast.show({
            content: '顺序更改成功~',
          })
    }

    useEffect(() => {
        if(tabList.length>0){
            setlistDispatch(tabList)
        }
    },[])

    return (
        <Wrapper model={model}>
            <div className='nav'>
                <span className='nav_title'>领域顺序</span>
                <div className='nav_on'>
                    <span onClick={()=>doFinish()}>完成</span>
                    <i className='fa fa-chevron-down' onClick={()=>navigate('-1')}/>
                </div>
            </div>
            <ul>
                <li className='sug'>长按拖动排序</li>
                <li className='top'>推荐</li>
            </ul>
            <Changelist list={changelist} doChanged={doChanged}/>
        </Wrapper>
    )
}

const mapStatetoProps = (state:rootState) => ({
    model:state.model,
    tabList:state.find.tabList,
    changelist:state.navigation.changeList
})
const mapDispatchToProps = (dispatch:Dispatch) => ({
    setlistDispatch(data:FindTabsType[]) {
        dispatch(setChangeList(data))
    },
    setTabListDispatch(data:FindTabsType[]) {
        dispatch(setTabList(data))
    }
})

export default connect(mapStatetoProps,mapDispatchToProps)(memo(Navigation))