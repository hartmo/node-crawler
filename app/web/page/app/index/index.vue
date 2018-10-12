<template>
  <div>
    <div>
      <m-table v-model="indexDate">
        <el-table-column prop="name"
                         label="路由">
          <template slot-scope="scope">
            <a :href="scope.row.path">{{scope.row.name}}</a>
          </template>
        </el-table-column>
      </m-table>
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