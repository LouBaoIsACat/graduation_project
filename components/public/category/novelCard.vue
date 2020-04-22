<template>
    <div class="com-novel-card">
        <el-row class="card">
            <el-col :span="10" class="left">
                <a :href="'/novel?bookId='+meta.bookId"><img :src="meta.cover" alt="小说封面"></a>
            </el-col>
            <el-col :span="14" class="right">
                <div class="header">
                    <h3>
                        <a :href="'/novel?bookId='+meta.bookId" :title="meta.name">
                            {{meta.name.length > 5 ? meta.name.substring(0, 5) + "..." : meta.name}}
                        </a>
                    </h3>
                    <span>{{meta.author}}</span>
                </div>
                <p>{{meta.intro.length > 65 ? meta.intro.substring(0, 65) + '... ...' : meta.intro}}</p>
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
    data(){
        return {
            meta1: {
                name: '元尊',
                author: '天蚕土豆',
                intro: '吾有一口玄黄气，可吞天地日月星。天蚕土豆最新鼎力大作，2017年度必看玄幻小说。',
                cover: 'http://www.xbiquge.la/files/article/image/14/14930/14930s.jpg'
            }
        }
    }
}
</script>

<style lang="scss">
.com-novel-card {
    width: 358px;
    height: 188px;
    float: left;
    .card {
        width: 358px;
        height: 188px;
        padding: 5px;
        margin: 0 auto;
        .left {
            width: 142px;
            height: 177px;
            border: 1px solid #dddddd;
            padding: 1px;
            img {
                width: 138px;
                height: 173px;
            }
        }
        .right {
            width: 199px;
            height: 177px;
            float: right;
            .header {
                position: relative;
                padding: 5px 0;
                margin-bottom: 5px;
                border-bottom: 1px dotted #96d4e9;
                h3 a {
                    color: #6b78a7;
                    font-weight: 700;
                }
                span {
                    position: absolute;
                    right: 0;
                    top: 6px;
                    font-size: 16px;
                    color: #b3b3b3;
                }
            }
            p {
                text-indent: 2em;
                color: #555555;
            }
        }
    }
}
</style>