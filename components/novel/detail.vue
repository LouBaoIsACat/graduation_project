<template>
    <div class="com-detail">
        <el-row>
            <el-col :span="4">
                <div class="pic">
                    <img :src="meta.cover" alt="小说图片">
                </div>
            </el-col>
            <el-col :span="20">
                <div class="up">
                    <h1>{{meta.title}}</h1>
                    <span class="author">作&nbsp;者：{{meta.author}}</span>
                    <span class="time">最后更新：{{meta.lastUpdateTime}}</span>
                    <div class="actions">动作：
                        <action-index :meta="meta" />
                    </div>
                    <span class="newChapter">最新章节：
                        <a href="#">{{meta.lastUpdateChapter}}</a>
                    </span>
                </div>
                <p class="introduce">{{meta.introduce}}</p>
            </el-col>
        </el-row>
        <p class="recommend">推荐阅读：</p>
    </div>
</template>

<script>
import actionIndex from '../public/actions/index.vue'
export default {
    props: {
        meta: {
            type: Object,
            default: () => {
                return {}
            }
        },
        meta2: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
        actionIndex
    },
    data(){
        return {
            meta1: {
                cover: 'http://www.xbiquge.la/files/article/image/14/14930/14930s.jpg',
                title: '元尊',
                author: '天蚕土豆',
                introduce: '吾有一口玄黄气，可吞天地日月星。天蚕土豆最新鼎力大作，2017年度必看玄幻小说。',
                lastUpdateTime: '2020-04-13 20:30:01',
                lastUpdateChapter: '第一千两百零四章 大敌来临',
                lastUpdateChpaterId: '401'
            }
        }
    }
}
</script>

<style lang="scss">
.com-detail {
    padding: 15px 15px 5px 15px;
    .pic {
        width: 138px;
        height: 172px;
        border: 15px solid #deeced;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .up {
        position: relative;
        height: 120px;
        border-bottom: 1px dashed #6ec8e6;
        h1 {
            font-size: 30px;
        }
        .author {
            position: absolute;
            top: 47px;
        }
        .time {
            position: absolute;
            top: 85px;
        }
        .actions {
            position: absolute;
            left: 360px;
            top: 80px;
            .com-action {
                display: inline-block;
            }
            .el-card {
                margin-top: 5px;
            }
        }
        .newChapter {
            position: absolute;
            left: 360px;
            top: 47px;
            a {
                color: #6b78a7;
            }
        }
    }
    .introduce {
        padding: 10px;
        text-indent: 2em;
        color: #555555;
    }
    .recommend {
        margin-top: 5px;
    }
}
</style>