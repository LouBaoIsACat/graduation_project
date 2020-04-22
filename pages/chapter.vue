<template>
    <div class="page-chapter">
        <crumbs :meta="crumbsData" />
        <div class="header">
            <h1>{{chapterDetail.name}}</h1>
            <a :href="'chapter?chapterId='+last" class="left" v-if="hasLastChapter">上一章</a>
            <a :href="'novel?bookId='+chapterDetail.bookId" class="center">章节目录</a>
            <a :href="'chapter?chapterId='+next" v-if="hasNextChapter" class="right">下一章</a>
        </div>
        <div class="content">
            <p>{{chapterDetail.content}}</p>
        </div>
        <div class="footer">
            <a :href="'chapter?chapterId='+last" v-if="hasLastChapter" class="left">上一章</a>
            <a :href="'novel?bookId='+chapterDetail.bookId" class="center">章节目录</a>
            <a :href="'chapter?chapterId='+next" v-if="hasNextChapter" class="right">下一章</a>
        </div>
        <div class="actions">
            <action-index :meta="actionData" />
        </div>
    </div>
</template>

<script>
import Crumbs from '@/components/chapter/crumbs.vue'
import actionIndex from '@/components/public/actions/index.vue'
export default {
    components: {
        Crumbs,
        actionIndex
    },
    computed: {
        last: function(){
            return (parseInt(this.chapterId) - 1).toString()
        },
        next: function(){
            return (parseInt(this.chapterId) + 1).toString()
        },
        hasLastChapter: function(){
            return (this.chapterId.replace(this.chapterDetail.bookId, '') !== '0')
        },
        hasNextChapter: function(){
            return (this.chapterId.replace(this.chapterDetail.bookId, '') !== '300')
        }
    },
    async asyncData(ctx){
        let {chapterId} = ctx.query
        let {status, data: {chapterDetail}} = await ctx.$axios.get('/chapter/getChapterDetail', {
            params: {
                chapterId
            }
        })
        let {status: status1, data: {novelDetail}} = await ctx.$axios.get('/chapter/getNovelName', {
            params: {
                bookId: chapterDetail.bookId
            }
        })
        let {status: status2, data: {isStar, msg}} = await ctx.$axios.get('/users/isStar', {
            params: {
                bookId: chapterDetail.bookId
            }
        })
        let {status: status3, data: {isRecommend}} = await ctx.$axios.get('/users/isRecommend', {
            params: {
                bookId: chapterDetail.bookId
            }
        })
        if (status === 200 && status1 === 200 && status2 === 200 && status3 === 200) {
            return {
                chapterId,
                chapterDetail,
                crumbsData: {
                    bookId: chapterDetail.bookId,
                    type_: novelDetail.type_,
                    name: novelDetail.name,
                    chapterName: chapterDetail.name
                },
                actionData: {
                    bookId: chapterDetail.bookId,
                    isStar,
                    isRecommend
                }
            }
        } else {
            return {
                chapterDetail: {},
                crumbsData: {},
                actionData: {}
            }
        }
    }
}
</script>

<style lang="scss">
.page-chapter {
    width: 1132px;
    margin: 0 auto;
    border: 3px solid #bae0eb;
    .header {
        height: 100px;
        position: relative;
        margin: 0 10px;
        border-bottom: 1px dashed #bae0eb;
        text-align: center;
        h1 {
            line-height: 70px;
        }
    }
    .left, .right, .center {
        position: absolute;
    }
    .left {
        left: 472px;
    }
    .center {
        left: 536px;
    }
    .right {
        left: 618px;
    }
    .content {
        padding: 50px 80px;
        font-size: 18px;
        letter-spacing: 2px;
        color: #555555;
    }
    .footer {
        height: 40px;
        position: relative;
        margin: 0 10px;
        border-top: 1px dashed #bae0eb;
        .left, .center, .right {
            top: 10px;
        }
    }
    .actions {
        position: fixed;
        top: 241px;
        left: 50%;
        margin-left: 570px;
        .recommend-btn {
            display: block;
        }
        .el-button {
            margin: 5px;
        }
    }
}
</style>