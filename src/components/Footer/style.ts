import styled from 'styled-components'
import style from '@/assets/global-style'

export const FooterWrapper = styled.div<{model:boolean}>`
    width:100%;
    height:58px;
    /* background: ${style.theme_color_light}; */
    position:fixed;
    bottom: 0;
    left:0;
    display:flex;
    position:fixed;
    z-index:10;
    background-color:${props=>props.model?style.theme_color_light:style.theme_color_dark};
    .add{
        flex:1;
        display:flex;
        justify-content:center;
        ${props=>props.model?style.theme_color_dark:style.background_color_dark};
        div{
            background-color:#2e2e2e;
            width:31px;
            height:31px; 
            text-align:center;
            line-height:31px;
            margin-top:12px;
            border-radius:30%;
            i {
                color:${style.theme_color_light};
            }
        }
    }
    a {
        flex:1;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-around;
        padding:6px 0;
        color:${props => 
            (props.model ? style.font_color : '#676767')};
        /* & 上一层 */
        &.active{
            color:${props => 
            (props.model ? style.font_color_dark :
            style.font_color_light)};
        }
        i {
            font-size:22px;
        }
        span{
            font-size:13px;
        }
    }
`