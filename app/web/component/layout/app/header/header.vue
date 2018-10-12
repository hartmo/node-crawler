<template>
  <header class="header">
    <div class="container">
      <h1>
        <a href="/"
           class="router-link-active">momo</a>
      </h1>
      <ul class="nav">
        <li class="nav-item" v-for="(item,index) in indexDate" :key="index">
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
  import vm from './vm';
  export default vm;
</script>
