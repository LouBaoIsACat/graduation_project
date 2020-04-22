import Router from 'koa-router'
import axios from './utils/axios'
import Books from '../dbs/models/books'
import Chapters from '../dbs/models/chapters'

let router = new Router({prefix: '/chapter'})

router.get('/getChapterDetail', async (ctx) => {
    let {chapterId} = ctx.query
    let detail = await Chapters.findOne({"chapterId": chapterId})
    if (detail) {
        ctx.body = {
            code: 0,
            chapterDetail: detail
        }
    } else {
        ctx.body = {
            code: -1,
            chapterDetail: {}
        }
    }
})

router.get('/getNovelName', async (ctx) => {
    let {bookId} = ctx.query
    let book = await Books.findOne({bookId}).select("name type_")
    if (book) {
        ctx.body = {
            code: 0,
            novelDetail: book
        }
    } else {
        ctx.body = {
            code: -1,
            novelDetail: ""
        }
    }
})

export default router