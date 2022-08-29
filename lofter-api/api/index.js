const fetch = require('node-fetch');
const URL_FIND_RECOMMEND = "https://api.lofter.com/recommend/exploreRecom.json?product=lofter-android-7.0.2"
const URL_SEARCH_HOTKEY = "https://api.lofter.com/newapi/hotsearch/ranklist.json?product=lofter-android-7.0.2"
const  URL_SEARCH_SUGGEST = "https://api.lofter.com/newsearch/sug.json"
const URL_SEARCH_RESULT = 'https://api.lofter.com/newsearch/v2/all.json'

// 发现页推荐列表
const fetchFindRecommend = () => {
    return fetch(URL_FIND_RECOMMEND)
        .then(res => res.json())
        .then(json => json)
}

// 搜索页热词
const fetchSearchHotkey = () => {
    return fetch(URL_SEARCH_HOTKEY)
        .then(res => res.json())
        .then(json => json)
}

const fetchSearchSuggest = (keywords) => {
    const params = [
        `key=${keywords}`,
        'product=lofter-android-7.0.2'
    ];
    return fetch(URL_SEARCH_SUGGEST + "?" + params.join("&"))
        .then(res => res.json())
        .then(json => json)
}

const fetchSearchResult = (key) => {
    const params = [
        `key=${key}`,
        'sortType=0',
        'version=1',
        'product=lofter-android-7.1.1'
    ];
    return fetch(URL_SEARCH_RESULT + "?" + params.join("&"))
        .then(res => res.json())
        .then(json => json)
}

module.exports = {
    fetchFindRecommend,
    fetchSearchHotkey,
    fetchSearchSuggest,
    fetchSearchResult
}