<template>
  <div class="search">
    <div>
  <el-input placeholder="请输入搜索地址" v-model="searchUrl" class="input-with-select">
    <template slot="prepend">Http://</template>
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input>
</div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>