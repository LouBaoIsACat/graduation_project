import storage from 'good-storage'

// 定义存储搜索的key， _search_的定义内部使用的key
// const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 8

// 插入方法  arr存储的数据  val传入存储的值  compare前后比较的函数  maxlen存入的最大值
function insertArray (arr, val, compare, maxlen) {
    const index = arr.findIndex(compare)
    if (index === 0) { // 数据为数组中的第一个数据，不做处理
        return 
    }
    if (index > 0) { // 数组中有这条数据并不在第一条
        arr.splice(index, 1) // 删除这条数据
    }
    arr.unshift(val); // 把这条数据存储到数组的第一个位置上
    if (maxlen && arr.length > maxlen) { // 如果数组的数据个数超过最大值
        arr.pop() // 删除数组的最后一条数据
    }
}

export function saveSearch(username, query) {
    let searches = storage.get(`${username}_search`, [])
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(`${username}_search`, searches)
    return searches
}