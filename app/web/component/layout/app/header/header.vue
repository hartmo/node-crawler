<template>
  <header class="header">
    <div class="container">
      <h1>
        <a href="/"
           class="router-link-active">momo</a>
      </h1>
      <ul class="nav">
        <li class="nav-item" v-for="(item,index) in menuDate" :key="index">
          <a :href="item.path"
             :class="{'active' : selectedMenu === item.path}">{{item.name}}</a>
        </li>
      </ul>
    </div>
  </header>
</template>
<style>
  @import "./header.css";
</style>
<script type="text/babel">
  export default{
    data() {
      return {
        selectedMenu: '',
        menuDate: []
      };
    },
    computed: {},
    mounted() {
      this.selectedMenu = window.location.pathname.toLowerCase().replace(/\/$/, '');
      this.menuDate = this.$router.options.routes;
    }
  };
</script>
