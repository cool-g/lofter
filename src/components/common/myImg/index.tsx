import React, {useState,memo} from 'react';
import classnames from 'classnames'
import './style.css'
/**
 * 图片加载失败/还未加载完成就显示默认图片
 * @param {*} src  图片路径
 * @param {*} style  图片样式
 * @param {*} defaultImg  默认显示的图片路径
 */
interface MyImgProps {
    src:string,
    defaultImg:string,
    className?:string
}
const MyImg:React.FC<MyImgProps> = (props) => {
    const {src, defaultImg, className} = props
    const [imgSrc, handleImageErrored] = useState(src);
    return (
        <img className={classnames({className:true},'img')}
            onError={() => handleImageErrored(defaultImg)}
            src={imgSrc}
            style={{backgroundImage:defaultImg}}
        />
    );
}
export default memo(MyImg);