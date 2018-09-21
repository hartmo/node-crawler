<template>
  <app-layout >
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </app-layout>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "../../asset/index.scss";
</style>
<script type="text/babel">
import VueSocketio from 'vue-socket.io';
export default {
  computed: {

  },
  mounted() {

  }
};
</script>
