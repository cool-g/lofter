interface rankList {
    listName:string;
    sortNo:number;
    hotLists:hotLists[];
}

interface hotLists {
    blogId:number;
    title:string;
    img:string;
    score:string;
    icon:string;
}

export type {
    rankList,
    hotLists
}