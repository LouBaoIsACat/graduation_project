import Router from 'koa-router'
import axios from './utils/axios'
import Books from '../dbs/models/books'
import Chapters from '../dbs/models/chapters'
import Xuanhuan from '../dbs/models/xuanhuan'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

let router = new Router({prefix: '/book'})

router.get('/getRecommendBooks', async (ctx) => { // 首页推荐的四本书
    var num = 4
    var sort = {'star': -1, 'insertTime': 1}
    const result = await Books.find().limit(num).sort(sort)
    if (result) {
        ctx.body = {
            books: result
        }
    } else {
        ctx.body = {
            books: []
        }
    }
})

router.get('/getLastRecommendBooks', async (ctx) => { // 首页的上期推荐榜
    var num = 6
    var sort = {'recommend': -1}
    const result = await Books.find().limit(num).sort(sort)
    if (result) {
        ctx.body = {
            code: 0,
            lastRecommendNovels: result
        }
    } else {
        ctx.body = {
            code: -1,
            lastRecommendNovels: []
        }
    }
})

router.get('/getIndexNovelsRank', async (ctx) => { // 首页各个类别小说排行
    var num = 13
    var sort = {'recommend': -1}
    let novelRanks = []
    for (let i = 0; i < 6; i++) {
        let result = await Books.find({'type_': i}).limit(num).sort(sort)
        if (result) {
            novelRanks.push(result)
        } else {
            novelRanks.push([])
        }
    }
    ctx.body = {
        code: 0,
        novelRanks
    }
})

router.get('/getRecentUpdateNovels', async (ctx) => {
    var num = 30
    var sort = {'insertTime': -1}
    let recentUpdataNovels = []
    let chapters = await Chapters.find().limit(num).sort(sort)
    if (chapters) {
        for (let i = 0; i < chapters.length; i++) {
            let book = await Books.findOne({'bookId': chapters[i].bookId})
            if (book) {
                recentUpdataNovels.push({
                    bookId: book.bookId,
                    type: book.type_,
                    title: book.name,
                    chapter: chapters[i].name,
                    chapterId: chapters[i].chapterId,
                    author: book.author
                })
            }
        }
        ctx.body = {
            code: 0,
            recentUpdataNovels
        }
    } else {
        ctx.body = {
            code: -1,
            recentUpdataNovels: []
        }
    }
})

router.get('/getRecentAddNovels', async (ctx) => { // 首页最近入库的小说
    var num = 30
    var sort = {'insertTime': -1}
    let recentAddNovels = await Books.find().limit(num).sort(sort).select('bookId name author type_')
    if (recentAddNovels) {
        ctx.body = {
            code: 0,
            recentAddNovels
        }
    } else {
        ctx.body = {
            code: -1,
            recentAddNovels: []
        }
    }
})

router.get('/getSearchNovels', async (ctx) => { // 首页搜索栏输入关键字搜索
    let {search} = ctx.query
    var num = 8
    var re = new RegExp(search, 'i')
    let searchNovels = await Books.find({"name": {$regex: re}}).limit(num)
    if (searchNovels) {
        ctx.body = {
            code: 0,
            searchNovels
        }
    } else {
        ctx.body = {
            code: -1,
            searchNovels: []
        }
    }
})

router.get('/getRankNovel', async (ctx) => { // 排行榜页面
    let rankNovels = []
    let num = 10
    let sort = {"star": -1}
    for (let i = 0; i < 6; i++) {
        let books = await Books.find({"type_": i}).limit(num).sort(sort)
        if (books) {
            rankNovels.push(books)
        }
    }
    let books = await Books.find().limit(num).sort(sort)
    if (books) {
        rankNovels.push(books)
    }
    ctx.body = {
        rankNovels
    }
})

router.get('/getAllNovels', async (ctx) => {
    let allNovels = await Books.find().select("bookId name")
    if (allNovels) {
        ctx.body = {
            code: 0,
            allNovels
        }
    } else {
        ctx.body = {
            code: -1,
            allNovels: []
        }
    }
})

export default router