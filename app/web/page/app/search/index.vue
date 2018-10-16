<template>
  <div class="search">
    <div>
      <el-input placeholder="请输入搜索地址"
                v-model="searchUrl"
                class="input-with-select">
        <template slot="prepend">Http://</template>
        <el-button slot="append"
                   icon="el-icon-search"
                   @click="search"
                   :loading="searchLoading"></el-button>
      </el-input>
    </div>
    <div class="search-warp">
      <el-row type="flex"
              class="row-bg"
              justify="space-between">
        <el-col :span="6"
                v-for="(item,index) in booklist"
                :key="index">
          <div class="grid-content"
               @click="showChapter(item)">
            <div class="name">{{item.name}}</div>
            <el-progress type="circle"
                         :percentage="progress(item).num"
                         color="#29E798"></el-progress>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="章节信息"
               :visible.sync="dialogVisible.show"
               width="60%">
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>{{dialogVisible.book.name}}</span>
          <el-progress :text-inside="true"
                       :stroke-width="20"
                       :percentage="progress(dialogVisible.book).num"
                       color="#29E798"></el-progress>
        </div>
        <el-row :gutter="24"
                class="dialog-card">
          <el-col :span="dialogVisible.book.errorList.length?12:24">
            <h3 class="success">{{progress(dialogVisible.book).num>=100?'下载成功':'获取中'}}</h3>
            <div class="dialog-warp">
              <div v-for="(item,index) in dialogVisible.book.successList"
                   :key="index"
                   class="item item-success">
                {{item.data.name}}
              </div>
            </div>
          </el-col>
          <el-col :span="12"
                  v-if="dialogVisible.book.errorList.length">
            <h3 class="error">获取失败</h3>
            <div class="dialog-warp">
              <div v-for="(item,index) in dialogVisible.book.errorList"
                   :key="index"
                   class="item item-error">
                {{item.data.name}}
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>