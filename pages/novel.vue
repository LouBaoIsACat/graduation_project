<template>
    <div class="page-novel">
        <div class="detail">
            <crumbs :meta="bookDetail" />
            <detail :meta="detailData" />
        </div>
        <chapters-list :meta="chaptersList" />
    </div>
</template>

<script>
import Crumbs from "@/components/novel/crumbs.vue"
import Detail from "@/components/novel/detail.vue"
import ChaptersList from "@/components/novel/chaptersList.vue"
export default {
    components: {
        Crumbs,
        Detail,
        ChaptersList
    },
    async asyncData(ctx){
        let {bookId} = ctx.query
        let {status, data: {bookDetail, chapters}} = await ctx.$axios.get('/novel/getNovelDetail', {
            params: {
                bookId
            }
        })
        let {status: status1, data: {isStar, msg}} = await ctx.$axios.get('/users/isStar', {
            params: {
                bookId
            }
        })
        let {status: status2, data: {isRecommend}} = await ctx.$axios.get('/users/isRecommend', {
            params: {
                bookId
            }
        })
        if (status === 200 && status1 === 200 && status2 === 200) {
            let lastChapter = chapters[chapters.length-1]
            return {
                bookDetail,
                chaptersList: chapters,
                detailData: {
                    bookId,
                    isStar,
                    isRecommend,
                    cover: bookDetail.cover,
                    title: bookDetail.name,
                    author: bookDetail.author,
                    introduce: bookDetail.intro,
                    lastUpdateTime: lastChapter.insertTime.toString(),
                    lastUpdateChapter: lastChapter.name,
                    lastUpdateChapterId: lastChapter.chapterId
                }
            }
        }
    }
}
</script>

<style lang="scss">
.page-novel {
    width: 1138px;
    margin: 0 auto;
    .detail {
        border: 3px solid #bae0eb;
    }
}
</style>