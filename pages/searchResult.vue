<template>
    <div class="page-search-result">
        <ul v-if="search">
            <li v-for="(item, index) in searchNovels" :key="index">
                <div class="pic">
                    <img :src="item.cover" alt="小说图片">
                </div>
                <div class="detail">
                    <h3>
                        <a :href="'novel?bookId='+item.bookId">
                            {{item.name.length>12?item.name.substring(0,12)+'...':item.name}}
                        </a>
                    </h3>
                    <span class="author">{{item.author}}</span>
                    <p>{{item.intro.length>120?item.intro.substring(0,120)+'...':item.intro}}</p>
                </div>
            </li>
        </ul>
        <p v-else>找不到与{{search}}有关的小说</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchNovels: [],
            search: ''
        }
    },
    async mounted() {
        let search = ''
        search = window.sessionStorage.getItem('searchKw')
        console.log("[search]:", search)
        let {status, data: {searchNovels}} = await this.$axios.get('/book/getSearchNovels', {
            params: {
                search: search
            }
        })
        if (status === 200) {
            this.searchNovels = searchNovels
            this.search = search
        }
    }
}
</script>

<style lang="scss">
.page-search-result {
    width: 1136px;
    margin: 0 auto;
    ul {
        li {
            list-style: none;
            width: 470px;
            height: 200px;
            float: left;
            padding: 10px;
            margin: 0 15px 15px 0;
            border: 1px solid #dddddd;
            .pic {
                width: 147px;
                height: 196px;
                float: left;
                padding: 1px;
                border: 1px solid #dddddd;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .detail {
                width: 300px;
                float: left;
                position: relative;
                margin-left: 15px;
                h3 {
                    height: 30px;
                    border-bottom: 1px dashed #36cae7;
                    line-height: 35px;
                }
                .author {
                    position: absolute;
                    top: 8px;
                    right: 0;
                    color: #b3b3b3;
                }
                p {
                    margin-top: 8px;
                }
            }
        }
    }
}
</style>