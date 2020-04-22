<template>
  <div class="page-index">
    <el-row class="recommend">
      <el-col :span="17" class="left">
        <el-row>
          <el-col :span="12"><novel-card :meta="recommendNovel[0]" /></el-col>
          <el-col :span="12"><novel-card :meta="recommendNovel[1]" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><novel-card :meta="recommendNovel[2]" /></el-col>
          <el-col :span="12"><novel-card :meta="recommendNovel[3]" /></el-col>
        </el-row>
      </el-col>
      <el-col :span="7" class="right"><recommend :meta="lastRecommendNovels" /></el-col>
    </el-row>
    <el-row class="category-rank category-rank1">
      <el-col :span="8" class="card"><category :meta="novelRanks[0]" /></el-col>
      <el-col :span="8" class="card"><category :meta="novelRanks[1]" /></el-col>
      <el-col :span="8"><category :meta="novelRanks[2]" /></el-col>
    </el-row>
    <el-row class="category-rank">
      <el-col :span="8" class="card"><category :meta="novelRanks[3]" /></el-col>
      <el-col :span="8" class="card"><category :meta="novelRanks[4]" /></el-col>
      <el-col :span="8"><category :meta="novelRanks[5]" /></el-col>
    </el-row>
    <el-row class="recent">
      <el-col :span="16"><recent-update :meta="recentUpdataNovels" /></el-col>
      <el-col :span="8" class="recent-add"><recent-add :meta="recentAddNovels" /></el-col>
    </el-row>
  </div>
</template>

<script>
import novelCard from '@/components/index/novelCard.vue'
import recommend from '@/components/index/recommend.vue'
import category from '@/components/index/category.vue'
import recentUpdate from '@/components/index/recentUpdate.vue'
import recentAdd from '@/components/index/recentAdd.vue'
export default {
  components: {
    novelCard,
    recommend,
    category,
    recentUpdate,
    recentAdd
  },
  data(){
    return {
      b: {
        name: '三寸人间',
        author: '耳根',
        intro: '举头三尺无神明，掌心三寸是人间。这是耳根继《仙逆》《求魔》《我欲封天》《一念永恒》后，创作的第五部长篇小说《三寸人间》。',
        cover: 'http://www.xbiquge.la/files/article/image/10/10489/10489s.jpg'
      }
    }
  },
  async asyncData(ctx){
    let {status, data: {books}} = await ctx.$axios.get('/book/getRecommendBooks')
    let types = ['玄幻', '修真', '都市', '历史', '网游', '科幻', '全本', '全部']
    let {status: status1, data: {lastRecommendNovels}} = await ctx.$axios.get('/book/getLastRecommendBooks')
    let {status: status2, data: {novelRanks}} = await ctx.$axios.get('/book/getIndexNovelsRank')
    let {status: status3, data: {recentUpdataNovels}} = await ctx.$axios.get('/book/getRecentUpdateNovels')
    let {status: status4, data: {recentAddNovels}} = await ctx.$axios.get('/book/getRecentAddNovels')
    if (status === 200 && status1 === 200 && status2 === 200 && status3 === 200 && status4 === 200) {
      return {
        recommendNovel: books,
        lastRecommendNovels: lastRecommendNovels.map(item => {
          return {
            type: types[item.type_],
            bookId: item.bookId,
            title: item.name,
            author: item.author
          }
        }),
        novelRanks: novelRanks.map(item => {
          return {
            title: types[item[0].type_],
            first: {
              bookId: item[0].bookId,
              title: item[0].name,
              author: item[0].author,
              introduce: item[0].intro,
              cover: item[0].cover
            },
            rank: item.slice(1,13).map(item1 => {
              return {
                bookId: item1.bookId,
                title: item1.name,
                author: item1.author
              }
            })
          }
        }),
        recentUpdataNovels: recentUpdataNovels.map(item => {
          return {
            bookId: item.bookId,
            title: item.title,
            author: item.author,
            type: types[item.type],
            chapterId: item.chapterId,
            chapter: item.chapter
          }
        }),
        recentAddNovels: recentAddNovels.map(item => {
          return {
            bookId: item.bookId,
            title: item.name,
            author: item.author,
            type: types[item.type_]
          }
        })
      }
    } else {
      return {
        recommendNovel: [],
        lastRecommendNovels: [],
        novelRanks: [],
        recentUpdataNovels: [],
        recentAddNovels: []
      }
    }
  }
}
</script>

<style lang="scss">
.page-index {
  width:1137px;
  margin: 0 auto;
  .left {
    border: 3px solid #bae0eb;
    padding: 5px;
    .novel-card {
      margin: 0 auto;
    }
  }
  .right {
    padding-left: 10px;
  }
  .category-rank {
    margin-top: 15px;
    padding: 5px;
    border: 3px solid #bae0eb;
    .card {
      border-right: 1px dotted #96d4e9; 
    }
  }
  .category-rank1 {
    margin-top: 25px;
  }
  .recent {
    margin-top: 25px;
    .recent-add {
      padding-left: 10px;
    }
  }
}
</style>
