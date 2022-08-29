import React, { memo,useRef,useState,useEffect,useMemo } from 'react'
import { SearchBoxWrapper } from './style'
import { debounce } from '@/utils/index'

interface SearchBoxProps  {
    // 按下热词后显示在input上的搜索词
    newQuery?:string,
    // 需要搜索的搜索词
    handleQuery?:(q:string)=>void,
    model:boolean;
    handleEnterKey?:(value:string)=>void;
    onfocus?:()=>void;
}

const SearchBox:React.FC<SearchBoxProps> = (props) => {
    const queryRef = useRef<HTMLInputElement | null>(null);
    const { newQuery,model } = props;
    const { 
        handleQuery=()=>{},
        handleEnterKey=()=>{},
        onfocus=()=>{}
    } = props;
    const [query,setQuery] = useState('');

    let handleQueryDebounce = useMemo(()=>{
        return debounce(handleQuery,500)
    },[handleQuery])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let val=e.currentTarget.value;
        setQuery(val);
    }

    useEffect(()=> {
        // 挂载后
        queryRef.current&&queryRef.current.focus();
    },[])

    useEffect(()=>{
        // query 更新
        handleQueryDebounce(query);
    },[query])

    useEffect(() => {
        // mount 时候 执行 父组件 newQuery -> input query 
        let curQuery = query;
        if(newQuery&&newQuery !== query){
            curQuery = newQuery;
            queryRef.current ? queryRef.current.value = newQuery:'';
        }
        setQuery(curQuery);
        // newQuery 更新时执行  
    },[newQuery])

    const clearQuery = () => {
        setQuery('');
        queryRef.current ?queryRef.current.value = "":'';
        queryRef.current ?queryRef.current.focus():'';
        
    }
    // 按下enter后向父组件报告
    const onEnterKey = (e:any) => {
        if(e.nativeEvent.keyCode === 13){
            handleEnterKey(e.target.value)
        }
    }

    const displayStyle = query?{display:'block'}:{display:'none'};

    return (
        <SearchBoxWrapper model={model}>
                <input type="text" className='box' 
                    placeholder='搜标签、合集、文章、粮单、用户'
                    ref={queryRef}
                    onChange={handleChange}
                    onKeyPress={onEnterKey} 
                    onFocus={onfocus}
                />
                <i className='fa fa-search'/>
                <i 
                    className="fa fa-times" 
                    style={displayStyle}
                    onClick={clearQuery}
                ></i>
        </SearchBoxWrapper>
    )
}
export default memo(SearchBox)