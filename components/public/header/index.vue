<template>
    <div class="com-header">
        <el-row class="top-bar">
            <el-col><top-bar /></el-col>
        </el-row>
        <el-row>
            <el-col><search-bar /></el-col>
        </el-row>
        <el-row>
            <el-col><nav-bar /></el-col>
        </el-row>
    </div>
</template>

<script>
import TopBar from './topbar.vue'
import SearchBar from './searchbar.vue'
import NavBar from './navbar.vue'
export default {
    components: {
        TopBar,
        SearchBar,
        NavBar
    }
}
</script>

<style lang="scss">
.com-header {
    width: 100%;
    height: 141px;
    .top-bar {
        border-bottom: 2px solid #bae0eb;
        margin-bottom: 8px;
    }
}
</style>