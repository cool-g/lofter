import styled from "styled-components";
import style from '@/assets/global-style'

export const Wrapper = styled.div`
    padding-top:45px;
    .searchbox{
        width:93%;
        margin:3px auto;
        position:relative;
        .fixed {
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
        }
    }
`

export const NavBar = styled.ul<{model:boolean,showSearch:boolean}>`
    font-size:16px;
    display:flex;
    justify-content:center;
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index:10;
    background-color:${props=>props.model?style.theme_color_light:style.background_color_dark};
    a{
        color:${style.font_color};
        li {
            float:left;
            width:60px;
            height:38px;
            line-height:38px;
            text-align:center;
            font-weight:bold;
            position:relative;
            &.active{
                color:${props => 
                (props.model ? style.font_color_dark :
                style.font_color_light)};
            }
            &.active::after{
                content:'';
                width:38%;
                height:3px;
                background-color:${style.primary_color};
                position:absolute;
                top:35px;
                left:20px;
                border-radius:5px;
            }
        }
        
    }
    .fa-search {
        opacity:${props=>props.showSearch?1:0};
        position:absolute;
        top:11px;
        right:21px;
        font-size:19px;
        color:${props=>props.model?style.theme_color_dark:style.theme_color_light};
        transition:opacity .2s;
    }
`
