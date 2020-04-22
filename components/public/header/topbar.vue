<template>
    <el-row class="com-topbar">
        <el-col :span="21"><user /></el-col>
        <el-col :span="3">2</el-col>
    </el-row>
</template>

<script>
import User from './user.vue'
export default {
    components: {
        User
    }
}
</script>

<style lang="scss">
.com-topbar {
    width: 1127px;
    height: 34px;
    margin: 0 auto;
    color: #808080;
    padding-top: 8px;
}
</style>