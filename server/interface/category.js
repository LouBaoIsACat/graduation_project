import Router from 'koa-router'
import axios from './utils/axios'
import Books from '../dbs/models/books'
import Chapters from '../dbs/models/chapters'
import Xuanhuan from '../dbs/models/xuanhuan'

let router = new Router({prefix: '/category'})

router.get("/getCRecommendNovels", async (ctx) => { // 分类页面的推荐小说
    let {type} = ctx.query
    let num = 6
    let sort = {"recommend": -1}
    let books = await Books.find({"type_": type}).limit(num).sort(sort)
    if (books) {
        ctx.body = {
            code: 0,
            RecommendNovels: books
        }
    } else {
        ctx.body = {
            code: -1,
            RecommendNovels: []
        }
    }
})

router.get("/getRecentUpdateChapters", async (ctx) => { // 分类页面的最新更新章节
    let {type} = ctx.query
    var sort = {"insertTime": -1}
    let chapters = []
    let books = await Books.find({"type_": type})
    if (books) {
        for (let i = 0; i < books.length; i++) {
            let chapter = await Chapters.findOne({"bookId": books[i].bookId}).sort(sort)
            if (chapter) {
                chapters.push({
                    bookId: books[i].bookId,
                    title: books[i].name,
                    chapterId: chapter.chapterId,
                    chapterName: chapter.name,
                    author: books[i].author
                })
            }
        }
        ctx.body = {
            code: 0,
            recentUpdateChapters: chapters
        }
    } else {
        ctx.body = {
            code: -1,
            recentUpdateChapters: []
        }
    }
})

router.get('/getRecommendNovels', async (ctx) => {
    let {type} = ctx.query
    let num = 10
    let sort = {"recommend": -1}
    let books = await Books.find({"type_": type}).limit(num).sort(sort).select("bookId name author")
    if (books) {
        ctx.body = {
            code: 0,
            recommendNovels: books
        }
    } else {
        ctx.body = {
            code: -1,
            recommendNovels: []
        }
    }
})

export default router