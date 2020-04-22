<template>
    <div class="com-recommend">
        <div class="notice">
            <h3>公告牌</h3>
            <ul>
                <li>[公告] <a href="#">发现章节未及时更新请联系我们</a></li>
            </ul>
        </div>
        <div class="recom">
            <h3>上期强推</h3>
            <ul>
                <li v-for="(item, index) in meta" :key="index">
                    <span class="type">[{{item.type}}]</span>
                    <a :href="'novel?bookId='+item.bookId">{{item.title}}</a>
                    <span class="author">{{item.author}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        meta: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data(){
        return {
            meta1: [{
                type: '修真',
                title: '剑徒之路',
                author: '惰堕'
            }, {
                type: '修真',
                title: '剑徒之路',
                author: '惰堕'
            }, {
                type: '修真',
                title: '剑徒之路',
                author: '惰堕'
            }, {
                type: '修真',
                title: '剑徒之路',
                author: '惰堕'
            }, {
                type: '修真',
                title: '剑徒之路',
                author: '惰堕'
            }, {
                type: '修真',
                title: '剑徒之路',
                author: '惰堕'
            }]
        }
    }
}
</script>

<style lang="scss">
.com-recommend {
    border: 3px solid #bae0eb;
    background-color: #fff9ef;
    h3 {
        height: 25px;
        padding: 5px 10px;
        border-bottom: 1px solid #dddddd;
        background-color: #deeced;
        font-weight: 700;
    }
    ul {
        padding: 17px 10px 10px 10px;
        li {
            list-style: none;
            height: 20px;
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
            color: #555;
            .type {
                display: inline-block;
                margin-right: 5px;
            }
            a {
                color: #6b78a7;
            }
            .author {
                float: right;
            }
        }
    }
}
</style>