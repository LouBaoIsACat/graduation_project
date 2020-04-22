<template>
    <div class="page-myStar">
        <div class="card"  v-if="$store.state.user.user">
            <div class="msg" v-if="msg">{{msg}}</div>
            <el-card v-for="(item, index) in novels" :key="index">
                <div class="pic">
                    <a :href="'novel?bookId='+item.bookId"><img :src="item.cover" alt="小说图片"></a>
                </div>
                <div class="detail">
                    <a :href="'novel?bookId='+item.bookId">
                        <h3 :title="item.name">{{item.name.length>6?item.name.substring(0,6)+"...":item.name}}</h3>
                    </a>
                    <span class="author">{{item.author}}</span>
                    <p>{{item.intro.length>65?item.intro.substring(0,65)+"...":item.intro}}</p>
                </div>
                <el-button type="primary" icon="el-icon-close" title="取消收藏" circle @click="unStar(item.bookId)"></el-button>
            </el-card>
        </div>
        <div class="toLogin" v-else>
            还未登录，请前往<a href="/login">登录</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: ''
        }
    },
    async asyncData(ctx){
        let {status, data: {starNovels}} = await ctx.$axios.get('/users/getStarNovels')
        if (status === 200) {
            return {
                novels: starNovels
            }
        }
    },
    methods: {
        unStar: function (id) {
            let self = this
            self.$axios.post('/users/unStar', {
                bookId: id
            }).then(({status, data}) => {
                if (status === 200) {
                    if (data && data.code === 0) {
                        self.msg = data.msg
                        setTimeout(() => {
                            location.reload()
                        }, 1500);
                    } else {
                        self.msg = data.msg
                    }
                } else {
                    self.msg = `服务器出错，状态码为${status}`
                }
                setTimeout(() => {
                    self.msg = ''
                }, 1500);
            })
        }
    }
}
</script>

<style lang="scss">
.page-myStar {
    width: 1138px;
    margin: 0 auto;
    .card {
        position: relative;
        .msg {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50px);
            padding: 20px;
            border: 1px solid #c5c1c1;
            border-radius: 5px;
            background-color: #fff;
            z-index: 1;
        }
        .el-card {
            width: 367px;
            height: 190px;
            float: left;
            position: relative;
            overflow: visible;
            margin: 0 15px 15px 0;
            .pic {
                width: 100px;
                height: 130px;
                float: left;
                padding: 1px;
                margin-top: 10px;
                border: 1px solid #c5c1c1;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .detail {
                float: left;
                position: relative;
                width: 197px;
                margin-left: 15px;
                h3 {
                    height: 28px;
                    border-bottom: 1px dashed #36cae7;
                    font-size: 18px;
                    color: #6b78a7;
                }
                .author {
                    position: absolute;
                    top: 7px;
                    right: 0;
                    color: #b3b3b3;
                }
                p {
                    text-indent: 2em;
                    color: #555555;
                }
            }
            .el-button {
                position: absolute;
                top: -13px;
                right: -11px;
                background-color: #36cae7;
                border-color: #36cae7;
            }
        }
        .el-card:nth-child(3n) {
            margin-right: 0;
        }
    }
}
</style>