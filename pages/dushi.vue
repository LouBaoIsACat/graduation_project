<template>
    <div class="page-xuanhuan">
        <div class="recommend clearfix">
            <novel-card :meta="RecommendNovels[0]" class="prettify" />
            <novel-card :meta="RecommendNovels[1]" class="prettify" />
            <novel-card :meta="RecommendNovels[2]" class="" />
            <novel-card :meta="RecommendNovels[3]" class="prettify prettify1" />
            <novel-card :meta="RecommendNovels[4]" class="prettify prettify1" />
            <novel-card :meta="RecommendNovels[5]" class="" />
        </div>
        <el-row class="list">
            <el-col :span="16"><recent-update :meta="recentUpdateChapters" /></el-col>
            <el-col :span="8" class="right"><recommend :meta="recommendNovels" /></el-col>
        </el-row>
    </div>
</template>

<script>
import novelCard from '@/components/public/category/novelCard.vue'
import recentUpdate from '@/components/public/category/recentUpdate.vue'
import recommend from '@/components/public/category/recommend.vue'
export default {
    components: {
        novelCard,
        recentUpdate,
        recommend
    },
    async asyncData (ctx) {
        let {status, data: {RecommendNovels}} = await ctx.$axios.get('/category/getCRecommendNovels', {
            params: {
                type: 2
            }
        })
        let {status: status1, data: {recentUpdateChapters}} = await ctx.$axios.get('/category/getRecentUpdateChapters', {
            params: {
                type: 2
            }
        })
        let {status: status2, data: {recommendNovels}} = await ctx.$axios.get('/category/getRecommendNovels', {
            params: {
                type: 2
            }
        })
        if (status === 200 && status1 === 200 && status2 === 200) {
            return {
                RecommendNovels,
                recentUpdateChapters,
                recommendNovels
            }
        }
    }
}
</script>

<style lang="scss">
.page-xuanhuan {
    width: 1127px;
    margin: 10px auto;
    .recommend {
        border: 3px solid #bae0eb;
        padding: 10px;
        .prettify {
            margin-right: 10px;
        }
        .prettify1 {
            margin-top: 5px;
        }
    }
    .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .clearfix {
        *zoom: 1;
    }
    .list {
        margin-top: 25px;
        .right {
            padding-left: 10px;
        }
    }
}
</style>