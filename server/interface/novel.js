import Router from 'koa-router'
import axios from './utils/axios'
import Books from '../dbs/models/books'
import Chapters from '../dbs/models/chapters'

let router = new Router({prefix: '/novel'})

router.get('/getNovelDetail', async (ctx) => {
    let {bookId} = ctx.query
    let book = await Books.findOne({"bookId": bookId})
    if (book) {
        let chapters = await Chapters.find({"bookId": bookId}).select("chapterId name insertTime")
        if (chapters) {
            ctx.body = {
                code: 0,
                bookDetail: book,
                chapters
            }
        } else {
            ctx.body = {
                code: -1,
                bookDetail: book,
                chapters: []
            }
        }
    } else {
        ctx.body = {
            code: -1,
            bookDetail: {},
            chapters: []
        }
    }
})

export default router