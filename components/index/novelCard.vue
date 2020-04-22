<template>
    <div class="com-novel-card">
        <el-row class="card">
            <el-col :span="10" class="left">
                <a :href="'novel?bookId='+meta.bookId"><img :src="meta.cover" alt="小说封面"></a>
            </el-col>
            <el-col :span="14" class="right">
                <div class="header">
                    <h3><a :href="'novel?bookId='+meta.bookId">{{meta.name}}</a></h3>
                    <span>{{meta.author}}</span>
                </div>
                <p>{{meta.intro.length > 68 ? meta.intro.substring(0, 68) + '... ...' : meta.intro}}</p>
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
    }
}
</script>

<style lang="scss">
.com-novel-card {
    .card {
        width: 390px;
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
            width: 220px;
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