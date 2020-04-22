<template>
    <div class="com-category">
        <h3 class="category-title">{{meta.title}}小说</h3>
        <el-row class="first">
            <el-col :span="6" class="pic">
                <a :href="'novel?bookId='+meta.first.bookId"><img :src="meta.first.cover" alt="小说图片"></a>
            </el-col>
            <el-col :span="18" class="detail">
                <h4><a :href="'novel?bookId='+meta.first.bookId">{{meta.first.title}}</a></h4>
                <span>{{meta.first.author}}</span>
                <p>{{meta.first.introduce.length > 85 ? meta.first.introduce.substring(0, 85) + '... ...' : meta.first.introduce}}</p>
            </el-col>
        </el-row>
        <el-row class="rank">
            <el-col :span="12">
                <ul>
                    <li v-for="(item, index) in meta.rank.slice(0, 6)" :key="index">
                        <a :href="'novel?bookId='+item.bookId" :title="item.title">{{item.title.length>5?item.title.substring(0,5)+'...':item.title}}</a>
                        <span :title="item.author">/&nbsp;{{item.author.length>5?item.author.substring(0,5)+'...':item.author}}</span>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <ul>
                    <li v-for="(item, index) in meta.rank.slice(6, 12)" :key="index">
                        <a :href="'novel?bookId='+item.bookId" :title="item.title">{{item.title.length>5?item.title.substring(0,5)+'...':item.title}}</a>
                        <span :title="item.author">/&nbsp;{{item.author.length>5?item.author.substring(0,5)+'...':item.author}}</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        meta: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            meta1: {
                title: "玄幻小说",
                first: {
                    title: "元尊",
                    author: "作者",
                    introduce: "吾有一口玄黄气，可吞天地日月星。天蚕土豆最新鼎力大作，2017年度必看玄幻小说。",
                    cover: "http://www.xbiquge.la/files/article/image/14/14930/14930s.jpg"
                },
                rank: [{
                    title: '沧元图1',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图2',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图3',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图4',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图5',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图6',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图7',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图8',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图9',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图10',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图11',
                    author: '我吃西红柿'
                }, {
                    title: '沧元图12',
                    author: '我吃西红柿'
                }]
            }
        }
    }
}
</script>

<style lang="scss">
.com-category {
    width: 362px;
    height: 332px;
    margin: 0 auto;
    .category-title {
        height: 30px;
        padding-left: 8px;
        border-bottom: 1px solid #96d4e9;
        background-color: #f5f8fe;
        line-height: 30px;
        font-weight: 700;
    }
    .first {
        margin-top: 12px;
        height: 134px;
        .pic {
            padding-left: 5px;
            a img {
                width: 76px;
                height: 95px;
            }
        }
        .detail {
            padding: 0 5px 0 13px;
            h4 a {
                color: #6b78a7;
            }
            span {
                float: right;
                margin-top: -19px;
                color: #cebab3;
            }
            p {
                color: #555555;
            }
        }
    }
    .rank {
        margin-top: 10px;
        ul {
            li {
                border-bottom: 1px solid #dddddd;
                list-style: none;
                height: 30px;
                line-height: 35px;
                a {
                    color: #6b78a7;
                    font-size: 15px;
                }
                span {
                    font-size: 12px;
                    color: #cebab3;
                }
            }
        }
    }
}
</style>