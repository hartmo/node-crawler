<template>
  <div>
    <div class="input">
      <span class="title">地址</span>
      <input type="text" v-model="search" placeholder="书本url">
      <span class="btn" @click="searchFun">开始</span>
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