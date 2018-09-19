<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入网址"
                v-model="search"
                class="input-with-select">
        <template slot="prepend">Http://</template>
        <el-button slot="append"
                   @click="searchFun"
                   icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div>
      <el-tabs v-model="editableTabsValue"
               type="card"
               editable
               @edit="handleTabsEdit">
        <el-tab-pane :key="item.name"
                     v-for="item in editableTabs"
                     :label="item.title"
                     :name="item.name">
          <m-table v-model="item.content">
            <el-table-column prop="title"
                             label="章节名字">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             width="180">
              <template slot-scope="scope">
                <el-tag type="warning"
                        v-if="scope.row.status===0">{{scope.row.msg}}</el-tag>
                <el-tag type="success"
                        v-else-if="scope.row.status===1">{{scope.row.msg}}</el-tag>
                <el-tag type="info"
                        v-else-if="scope.row.status===-1">{{scope.row.msg}}</el-tag>
              </template>
            </el-table-column>
          </m-table>
          <!-- <el-table :data="item.content"
                    style="width: 100%">
            
          </el-table> -->
        </el-tab-pane>
      </el-tabs>
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