import styled from 'styled-components'
import style from '@/assets/global-style'

export const SearchBoxWrapper = styled.div<{model:boolean}>`
    position:relative;
    flex:1;
    input {
        width:100%;
        height:1.75rem;
        background-color:${props => 
            props.model ? style.background_color_light :
            style.background_color_dark};
        border-radius:1rem;
        border:none;
        outline:none;
        padding-left:1.75rem;
        box-sizing:border-box;
        font-size:${style['font-size-s']};
    }
    .fa-search{
        position:absolute;
        font-size:.8rem;
        top:9px;
        left:.65rem;
    }
    .fa-times {
        position:absolute;
        font-size:.75rem;
        top:10px;
        right:15px;
    }
`