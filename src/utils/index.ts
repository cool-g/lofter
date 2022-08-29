/**
 * 防抖
 * @param func 
 * @param delay 
 * @returns 
 */
 export const debounce = (func:Function, delay:number) => {
  let timer:any;
  return function (...args:any[]) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

/**
 * 节流
 * @param {function} fun 
 * @param {number} time 
 * @returns 
 */
export const throttle = (fun:Function,time:number) => {
  let t1 = 0; // 初始时间
  return function(){
      let t2 = Date.now(); // 当前时间
      if(t2-t1>time){
          fun.apply(this,arguments)
          t1=t2
      }
  }
}

// 字符串相关的操作  
/**
* @func 格式化数字
* @params num:number  
* @return string
* 1218807  =>  121.9w
*/
export function formatTenThousand(num:number):string {
const numStr = String(num);
if(numStr.length<=3) {
    return numStr;
}
let wholeNumber = numStr.substring(0,numStr.length-3);
// console.log(wholeNumber);
const shousands = numStr.substring(numStr.length-3);
// 通过首位(百位)与余位拼接得到的小数 toFixd(0) 四舍五入
let decimalNumber = Number(shousands.substring(0,1)+"."+
    shousands.substring(1)).toFixed(0)
// console.log(decimalNumber);
// 百位 toFixed 进位后可能是10
if (decimalNumber.length ==2){
    decimalNumber = "0";
    wholeNumber = String(Number(wholeNumber) + 1);
}
return `${wholeNumber}.${decimalNumber}k`
}

/**
* 将数据里的<p>标签去除
* @param str 
* @returns 
*/
export function titleDelTag(str:string):string {
let newStr=str.replaceAll('<p>',' ')
newStr = newStr.replaceAll('</p>','')
newStr = newStr.replaceAll('&nbsp;','')
return newStr;
}

/**
* 判断当前路由是否在路由数组中
* @param path 
* @returns 
*/
export const isPathPartlyExisted = (pathArr:string[],path:string):boolean =>{
  // 1. path 全部匹配 /cities 
  // 2. path 多了 /homedetail/:id/comments/:abc
  let pathRes =path.split('/');
  if(pathRes[1] && pathArr.indexOf(`/${pathRes[1]}`)!=-1) return true;
  return false;
}
/**
* 将搜索记录存入LocalStorage
* @param historyList 
*/
export const setSearchHistory_loc = (historyList:string[]) => {
window.localStorage.setItem("search_history",
  JSON.stringify(historyList));
}
/**
* 从LocalStorage获取搜索记录
* @returns searchHistory
*/
export const getSearchHistory_loc = () => {
  return JSON.parse(window.localStorage.getItem('search_history')||'[]')
}

// export const removeSearchHistory = () => {
//   window.localStorage.removeItem("search_history")
// }

/**
* 计算当前元素相对于屏幕宽度的百分比的高度 
* @param data 
* @returns 
*/
type img = {
orign:string;
ow:number;
oh:number;
}
function computeRatioHeight (img:img):number {   
// 设计稿的屏幕宽度  
const screenWidth = 375;  
//设计稿中的元素高度，也可以前端根据类型约定

const imgHeight = (img!==undefined&&img.orign!=='')?
  (Math.ceil(img.oh/img.ow)*screenWidth):160;  
return imgHeight;
}

/**
* 将一批数据根据高度均分为两列
* @param data 
* @returns 
*/
export function formatData(data:any[]) {
let diff = 0; 
const left = []; 
const right = []; 
let i = 0; 

while(i < data.length) {  
  // console.log(data[i].postData.postView.firstImage)
  if (diff <= 0) {    
    left.push(data[i]);   
    diff += computeRatioHeight(data[i].postData.postView.firstImage);  
  } else {    
    right.push(data[i]);   
    diff -= computeRatioHeight(data[i].postData.postView.firstImage); 
  }    
  i++; 
} 
return { left, right }
}
