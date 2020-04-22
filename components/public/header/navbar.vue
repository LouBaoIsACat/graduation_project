<template>
    <div class="com-navbar">
        <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/myStar">我的书架</a></li>
            <li><a href="/xuanhuan">玄幻小说</a></li>
            <li><a href="/xiuzhen">修真小说</a></li>
            <li><a href="/dushi">都市小说</a></li>
            <li><a href="/chuanyue">穿越小说</a></li>
            <li><a href="wangyou">网游小说</a></li>
            <li><a href="kehuan">科幻小说</a></li>
            <li><a href="/rank">排行榜</a></li>
            <li><a href="/allNovels">全部小说</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.com-navbar {
    ul {
        width: 1123px;
        height: 40px;
        background-color: #6ec8e6;
        margin: 10px auto;
        padding-left: 15px;
    }
    ul li {
        height: 40px;
        list-style: none;
        display: inline-block;
        text-align: center;
        a {
            line-height: 42px;
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            margin: 15px;
        }
    }
}
</style>