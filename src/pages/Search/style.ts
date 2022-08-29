import styled from "styled-components";
import style from '@/assets/global-style'

export const Container = styled.div<{model:boolean}>`
    box-sizing:border-box;
    /* width:100%; */
    z-index:100;
    transform-origin:right bottom;
    margin:5px 12px 0 12px;
    position:relative;
    &.fly-enter,&.fly-appear {
        opacity:0;
        /* 启用gpu加速，显卡画出来的 */
        transform:translate3d(100%,0,0);
    }
    &.fly-enter-active,&.fly-apply-active {
        opacity:1;
        transition:all .3s;
        transform:translate3d(0,0,0);
    }
    &.fly-exit {
        opacity:1;
        transform:translate3d(0,0,0)
    }
    &.fly-exit-active {
        opacity:0;
        transition:all .3s;
        transform:translate3d(100%,0,0)
    }
    .searchBar {
        display:flex;
        margin:8px 0 15px 0;
        span{
            display:inline-block;
            width:50px;
            display:flex;
            justify-content:end;
            align-items:center;
            font-size:14px;
            color:${props=>props.model?
                style.theme_color_dark:style.theme_color_light}
        }
    }
`

export const ShortcutWrapper = styled.div<{show:boolean,model?:boolean}>`
    box-sizing:border-box;
    position:absolute;
    top:50px;
    bottom:0;
    width:100%;
    display:${props => props.show ? "" : "none"};
    h2 {
        font-size:18px;
        color:${props=>props.model?
                style.theme_color_dark:style.theme_color_light};
        margin-bottom:15px;
    }
`

export const HotKey = styled.div<{model:boolean}>`
    .history {
        margin-bottom:15px;
        p {
            display:flex;
            justify-content:space-between;
            font-size:${style["font-size-s"]};
            font-weight:bold;
            color:${props=>props.model?
                style.theme_color_dark:style.font_color};
            margin-bottom:15px;
        }
        .content{
            span {
                display:inline-block;
                padding:2px 7px;
                color:${props=>props.model?
                    style.theme_color_dark:style.font_color};
                margin:0 8px 8px 0;
                font-size:${style["font-size-s"]};
                border:1px solid ${props=>props.model?
                    '#f6f6f6':style.background_color_dark};;
                border-radius:15px;
            }
        } 
    }
    .tab {
        height:38px; 
        line-height:35px;
        margin-bottom:15px;
        color:${style.font_color};
        font-weight:bold;
    }
`

export const List = styled.div<{model:boolean}>`
    background-color:${props=>props.model?
        style.background_color_light:style.background_color_dark};
    padding:20px 18px;
    color:${style.font_color};
    border-radius:15px;
    overflow-y:auto;
    .listItem{
        display:flex;
        justify-content:space-between;
        font-weight:bold;
        font-size:13px;
        height:50px;
        align-items:center;
        .listItem_rank{
            margin-right:15px;
        }
        .listItem_pic{
            border-radius:50%;
            width:33px;
            height:33px;
            margin-right:10px;
        }
        .listItem_title{
            display:inline-block;
            color:${props=>props.model?
                style.theme_color_dark:style.font_color};
            margin-right:6px;
            overflow:hidden;
            text-overflow:ellipsis;
            max-width:150px;
            white-space:nowrap;
        }
        .listItem_icon{
            width:15px;
            height:15px;
        }
        .listItem_score{
            font-size:12px;
        }
        .listItem_userInfo{
            color:${style.font_color};
            display:flex;
            .title{
                display:flex;
                flex-direction:column;
                p {
                    font-size:12px;
                    font-weight:normal;
                    margin-top:8px;
                }
            } 
        }
    }
`