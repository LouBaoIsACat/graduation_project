<template>
    <div class="page-rank clearfix">
        <dl class="one">
            <dt>玄幻小说排行榜</dt>
            <dd v-for="(item, index) in ranks[0]" :key="index">
                <span>{{index+1}}&nbsp;</span>
                <a :href="'novel?bookId='+item.bookId">{{item.name}}</a>
            </dd>
        </dl>
        <dl class="two">
            <dt>玄幻小说排行榜</dt>
            <dd v-for="(item, index) in ranks[1]" :key="index">
                <span>{{index+1}}&nbsp;</span>
                <a :href="'novel?bookId='+item.bookId">{{item.name}}</a>
            </dd>
        </dl>
        <dl class="three">
            <dt>玄幻小说排行榜</dt>
            <dd v-for="(item, index) in ranks[2]" :key="index">
                <span>{{index+1}}&nbsp;</span>
                <a :href="'novel?bookId='+item.bookId">{{item.name}}</a>
            </dd>
        </dl>
        <dl class="four">
            <dt>玄幻小说排行榜</dt>
            <dd v-for="(item, index) in ranks[3]" :key="index">
                <span>{{index+1}}&nbsp;</span>
                <a :href="'novel?bookId='+item.bookId">{{item.name}}</a>
            </dd>
        </dl>
        <dl class="one">
            <dt>玄幻小说排行榜</dt>
            <dd v-for="(item, index) in ranks[4]" :key="index">
                <span>{{index+1}}&nbsp;</span>
                <a :href="'novel?bookId='+item.bookId">{{item.name}}</a>
            </dd>
        </dl>
        <dl class="two">
            <dt>玄幻小说排行榜</dt>
            <dd v-for="(item, index) in ranks[5]" :key="index">
                <span>{{index+1}}&nbsp;</span>
                <a :href="'novel?bookId='+item.bookId">{{item.name}}</a>
            </dd>
        </dl>
        <dl class="three">
            <dt>玄幻小说排行榜</dt>
            <dd v-for="(item, index) in ranks[6]" :key="index">
                <span>{{index+1}}&nbsp;</span>
                <a :href="'novel?bookId='+item.bookId">{{item.name}}</a>
            </dd>
        </dl>
        <dl class="four">
            <dt>玄幻小说排行榜</dt>
            <dd v-for="(item, index) in ranks[6]" :key="index">
                <span>{{index+1}}&nbsp;</span>
                <a :href="'novel?bookId='+item.bookId">{{item.name}}</a>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    async asyncData(ctx) {
        let {status, data: {rankNovels}} = await ctx.$axios.get('/book/getRankNovel')
        if (status === 200) {
            return {
                ranks: rankNovels
            }
        }
    }
}
</script>

<style lang="scss">
.page-rank {
    width: 1136px;
    margin: 0 auto;
    dl {
        float: left;
        position: relative;
        width: 260px;
        padding: 30px 5px 5px;
        margin: 0 16px 30px 0;
        dt {
            position: absolute;
            top: -11px;
            left: 50%;
            width: 150px;
            transform: translateX(-75px);
            text-align: center;
            padding: 5px 0;
            font-size: 14px;
            font-weight: 700;
            color: #555555;
        }
        dd {
            height: 30px;
            padding: 0 8px;
            border-bottom: 1px solid #e4e4e4;
            line-height: 38px;
            color: #555555;
            a {
                color: #0067bb;
            }
        }
    }
    dl:nth-child(4n) {
        margin: 0;
    }
    .one {
        border: 1px solid #ffdde9;
        dt {
            border: 1px solid #ffdde9;
            background-color: #ffdde9;
        }
    }
    .two {
        border: 1px solid #cfedf8;
        dt {
            border: 1px solid #cfedf8;
            background-color: #cfedf8;
        }
    }
    .three {
        border: 1px solid #fdf1d4;
        dt {
            border: 1px solid #fdf1d4;
            background-color: #fdf1d4;
        }
    }
    .four {
        border: 1px solid #e0f9cd;
        dt {
            border: 1px solid #e0f9cd;
            background-color: #e0f9cd;
        }
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
</style>