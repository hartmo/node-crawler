<template>
  <div>
    <el-table :data="value"
              style="width: 100%">
      <slot></slot>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="current.currentPage"
                   :page-sizes="[10, 50, 300, 400]"
                   :page-size="current.pageSizes"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="current.total">
    </el-pagination>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>