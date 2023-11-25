<template>
  <div style="width: 100%;">
    <el-table :data="player.songList" @row-click="handleRowClick" empty-text="搜索中...">
      <el-table-column type="index" label="#" />
      <el-table-column prop="name" label="标题" />
      <el-table-column prop="trackCount" label="歌曲数" />
      <el-table-column prop="creator.nickname" label="创建者" />
    </el-table>
  </div>
</template>
    
<script setup>
import { player } from './store.js'

const handleRowClick = async (row, column, event) => {

}

</script>
  
<style>
.highlight-row {
  color: #d84f15;
}
</style>