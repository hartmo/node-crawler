<template>
  <div class="m-t-10">
    <el-input placeholder="请输入爬取ip地址"
              v-model="ipAddress">
      <el-button slot="append"
                 @click="ipGet"
                 icon="el-icon-search"></el-button>
    </el-input>
    <m-table v-model="ipList">
      <el-table-column prop="address"
                       label="地区">
      </el-table-column>
      <el-table-column prop="ip"
                       label="ip">
      </el-table-column>
      <el-table-column prop="port"
                       label="端口号">
      </el-table-column>
      <el-table-column prop="type"
                       label="type">
      </el-table-column>
      <el-table-column prop="conTime"
                       label="连接速度">
        <template slot-scope="scope">
          <el-progress :percentage="percentage(scope.row.conTime,2)"
                       :text-inside="true"
                       :stroke-width="14"
                       :color="progressStatus(scope.row.conTime,2)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="speed"
                       label="连接时间">
        <template slot-scope="scope">
          <el-progress :percentage="percentage(scope.row.speed,6.31)"
                       :text-inside="true"
                       :stroke-width="14"
                       :color="progressStatus(scope.row.speed,6.31)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="checked"
                       label="连接验证">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.checked,1)">{{tagType(scope.row.checked,2)}}</el-tag>
          <el-button @click="checked(scope.row)">测试</el-button>
        </template>
      </el-table-column>
    </m-table>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>