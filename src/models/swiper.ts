// 幻灯片模板
interface findSwiperListType {
    [key:string]:any;
    recommend:swiperType[],
    video:swiperType[],
    life:swiperType[]
}


interface swiperType {
    id:number,
    img:string
}

export type {
    findSwiperListType,
    swiperType
}