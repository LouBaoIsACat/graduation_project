<template>
    <div class="com-chapters-list clearfix">
        <dl>
            <dd v-for="(item, index) in meta" :key="index">
                <a :href="'chapter?chapterId='+item.chapterId" :title="item.name">
                    {{item.name.length>25?item.name.substring(0, 25)+"..." : item.name}}
                </a>
            </dd>
        </dl>
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
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }, {
                name: "第一章 我要减肥！",
                id: "11"
            }]
        }
    }
}
</script>

<style lang="scss">
.com-chapters-list {
    width: 1122px;
    margin: 15px auto;
    padding: 5px;
    border: 3px solid #bae0eb;
    dl {
        dd {
            width: 354px;
            height: 32px;
            float: left;
            padding: 0 10px;
            border-bottom: 1px dashed #cccccc;
            line-height: 32px;
            a {
                color: #444444;
            }
        }
    }
}
.clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix {
    *zoom: 1;
}
</style>