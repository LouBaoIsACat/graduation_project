<template>
    <div class="com-crumbs">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path: '/'}">
                爱读小说
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <a :href="'/'+pinyinType">{{type}}小说</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{meta.name}}章节目录
            </el-breadcrumb-item>
        </el-breadcrumb>
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
    computed: {
        type: function(){
            let types = ['玄幻', '修真', '都市', '穿越', '网游', '科幻', '全本', '全部']
            return types[this.meta.type_]
        },
        pinyinType: function(){
            let types = ['xuanhuan', 'xiuzhen', 'dushi', 'chuanyue', 'wangyou', 'kehuan', 'quanben', 'quanbu']
            return types[this.meta.type_]
        }
    },
    data(){
        return {
            meta1: {
                type_: 0,
                name: "元尊"
            }
        }
    }
}
</script>

<style lang="scss">
.com-crumbs {
    // width: 1127px;
    border-bottom: 1px solid #6ec8e6;
    background-color: #deeced;
    padding: 18px;
    a {
        color: #6b78a7;
        font-size: 400;
    }
}
</style>