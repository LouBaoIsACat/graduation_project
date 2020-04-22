<template>
  <el-container>
    <el-header height="auto"><my-header /></el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer><my-footer /></el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header/index.vue'
import MyFooter from '@/components/public/footer/index.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  el-header {
    padding: 0;
  }
</style>
