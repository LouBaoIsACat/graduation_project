<template>
    <div class="com-recent-add">
        <h3>最新入库小说</h3>
        <ul>
            <li v-for="(item, index) in meta" :key="index">
                <span class="type">[{{item.type}}]</span>
                <a :href="'novel?bookId='+item.bookId" class="title">{{item.title}}</a>
                <span class="author">{{item.author}}</span>
            </li>
        </ul>
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
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }, {
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }, {
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }, {
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }, {
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }, {
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }, {
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }, {
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }, {
                title: "风波未平",
                author: "小吵闹大安静",
                type: "穿越"
            }]
        }
    }
}
</script>

<style lang="scss">
.com-recent-add {
    border: 3px solid #bae0eb;
    h3 {
        height: 30px;
        padding-left: 10px;
        background-color: #96d4e9;
        border-bottom: 1px solid #dddddd;
        line-height: 30px;
        font-weight: 700;
    }
    ul {
        padding: 15px 10px 10px;
        li {
            position: relative;
            list-style: none;
            height: 30px;
            border-bottom: 1px solid #ddd;
            line-height: 37px;
            .type {
                color: #745577;
                font-size: 12px;
            }
            .title {
                position: absolute;
                left: 53px;
                font-size: 15px;
                color: #6b78a7;
            }
            .author {
                position: absolute;
                right: 10px;
                color: #b3b3b3;
                font-size: 12px;
            }
        }
    }
}
</style>