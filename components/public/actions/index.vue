<template>
    <div class="com-action">
        <el-button v-if="!meta.isStar" type="warning" icon="el-icon-plus" size="mini" title="收藏" circle @click="star"></el-button>
        <el-button v-else type="warning" icon="el-icon-minus" size="mini" title="取消收藏" circle @click="unStar"></el-button>
        <el-button v-if="!meta.isRecommend" class="recommend-btn" type="success" icon="el-icon-star-off" size="mini" title="推荐" circle @click="recommend"></el-button>
        <el-button v-else class="recommend-btn" type="success" icon="el-icon-star-on" size="mini" title="取消推荐" circle @click="unRecommend"></el-button>
        <el-card v-if="msg">{{msg}}</el-card>
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
            msg: ''
        }
    },
    methods: {
        star: function(){
            let self = this
            self.$axios.post('/users/star', {
                bookId: self.meta.bookId
            }).then(({status, data}) => {
                if (status === 200) {
                    if (data && data.code === 0) {
                        self.msg = data.msg
                        self.meta.isStar = 1
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
        },
        unStar: function(){
            let self = this
            self.$axios.post('/users/unStar', {
                bookId: self.meta.bookId
            }).then(({status, data}) => {
                if (status === 200) {
                    if (data && data.code === 0) {
                        self.msg = data.msg
                        self.meta.isStar = 0
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
        },
        recommend: function(){
            let self = this
            self.$axios.post('/users/recommend', {
                bookId: self.meta.bookId
            }).then(({status, data}) => {
                if (status === 200) {
                    if (data && data.code === 0) {
                        self.msg = data.msg
                        self.meta.isRecommend = 1
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
        },
        unRecommend: function(){
            let self = this
            self.$axios.post('/users/unRecommend', {
                bookId: self.meta.bookId
            }).then(({status, data}) => {
                if (status === 200) {
                    if (data && data.code === 0) {
                        self.msg = data.msg
                        self.meta.isRecommend = 0
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

</style>