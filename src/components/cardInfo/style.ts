import styled from "styled-components";
import style from '@/assets/global-style'

export const Wrapper = styled.div`
   
`

export const ContentWrapper = styled.div<{flex:boolean}>`
    margin:10px 0 0 0;
    display:${props=>props.flex?'flex':''};
    flex-direction:row;
    justify-content:space-between;
    align-items:flex-start;
    column-count:${props => props.flex?1:2};
`
export const Column = styled.div`
    box-sizing:border-box;
    /* margin:4px; */
    padding:4px;
    width:50%;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
`

export const RecommendItem = styled.div<{imgHeight:number;model:boolean}>`
        /* 避免折行 */
        break-inside:avoid;
        width:100%;
        margin-bottom:18px;
        text-align:left;
        border-radius:.3125rem;
        position:relative;
        color:${style.font_color};
        .img_container{
            height:${props=>props.imgHeight>=2?'280px':''};
            overflow:hidden;
            .img {
                width:100%;
                border-radius:10px;
            }
        }
        
        .recommend-item-title{
            width:95%;
            color:${props=>props.model?style.theme_color_dark:style.font_color_light};
            font-weight:520;
            margin:8px 0;
            display:flex;
            p {
                font-size:14px;
                flex:1;
                line-height:18px;
                overflow:hidden;
                text-overflow:ellipsis;
                display:inline-block;
                -webkit-line-clamp:2;
                display:-webkit-box;
                line-clamp:2;
                -webkit-box-orient:vertical;
                font-weight:bold;
            }
            span {
                display:inline-block;
                font-size:15px;
                margin-left:2px;
                transform:translateX(5px);
            }
        }
        .recommend-item-Article {
            background-color:${props=>props.model?style.background_color_light:style.background_color_dark};
            width:82%;
            height:160px;
            padding:20px 15px;
            margin-bottom:10px;
            border-radius:10px;
            overflow:hidden;
            .article-title {
                width:120px;
                overflow:hidden;
                text-overflow:ellipsis; 
                white-space:nowrap;
                color:${props=>props.model?style.theme_color_dark:style.font_color_light};
                font-weight:bold;
                margin-bottom:15px;
            }
            .article-content {
                line-height:18px;
                /* margin-right:10px; */
                overflow:hidden;
                text-overflow:ellipsis;
                display:inline-block;
                -webkit-line-clamp:7;
                display:-webkit-box;
                line-clamp:7;
                -webkit-box-orient:vertical;
            }
        }
        .recommend-item-label {
            display:inline-block;
            background-color:${props=>props.model?style.background_color_light:style.background_color_dark};
            padding:4px 8px;
            border-radius:10px;
            margin:0 0 12px 0;
        }
        .recommend-item-bt {
            display:flex;
            justify-content:center;
            align-self: center;
            .author-info{
                flex:7;
                display:flex;
                img{
                    width:20px;
                    height:20px;
                    border-radius:100%;
                    margin-right:3px;
                    position:relative;
                    top:-3px;
                }
                p{
                    width:70px;
                    overflow:hidden;
                    text-overflow:ellipsis; 
                    white-space:nowrap;
                }
            }
            .like-count {
                flex:3;
                text-align:right;
                margin-right:2px;
                i {
                    font-size:14px;
                    margin-right:3px;
                    &.fa-heart{
                        color:${style.active_color};
                    }
                }
            }
        }
`

