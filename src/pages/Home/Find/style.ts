import styled from "styled-components";
import style from '@/assets/global-style'

export const Wrapper = styled.div`
    padding: 0 12px 18px 12px;
    margin-bottom:25px;
    .card {
        display:flex;
        align-items: center;
        height:38px;
        padding-bottom:14px;
        margin-bottom:2px;
        .tabs{
            flex:1;
            color:${style.font_color};
            font-weight:600;
            height:30px;
            line-height:30px;
        }        
        .switch {
            margin: 0 10px;
            transform: translate(2px,6px);
        }
    }
    
`
