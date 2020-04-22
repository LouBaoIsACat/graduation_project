<template>
    <div class="page-all-novels clearfix">
        <ul>
            <li v-for="(item, index) in allNovels" :key="index">
                <a :href="'novel?bookId='+item.bookId" :title="item.name">
                    {{item.name.length>15?item.name.substring(0, 15)+"...":item.name}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    async asyncData(ctx) {
        let {status, data: {allNovels}} = await ctx.$axios.get('/book/getAllNovels')
        if (status === 200) {
            return {
                allNovels
            }
        }
    }
}
</script>

<style lang="scss">
.page-all-novels {
    width: 1136px;
    margin: 0 auto;
    ul {
        li {
            list-style: none;
            float: left;
            width: 227px;
            height: 30px;
            border-bottom: 1px solid #dddddd;
            line-height: 35px;
            a {
                color: #6b78a7;
            }
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