<template>
  <div style="width: 100%;">
    <el-table :data="player.musicList" @row-click="handleRowClick" :row-class-name="rowClassName" empty-text="获取中..." show-overflow-tooltip>
      <el-table-column type="index" label="#" width="50" />
      <el-table-column prop="name" label="标题" />
      <el-table-column prop="artists[0].name" label="歌手" /> 
      <el-table-column prop="album.name" label="专辑" /> 
      <el-table-column prop="duration" label="时长" width="100" />
    </el-table>
  </div>
</template>
  
<script setup>
import { player } from './store.js'
import { getSong } from './request.js'
import { play } from './utils';

const handleRowClick = async (row, column, event) => {
  try {
    player.value.index = player.value.musicList.indexOf(row);
    const resp = await getSong({ id: player.value.musicList[player.value.index].id })
    player.value.url = resp.data.data[0].url;
    play();
  } catch (error) {
    // 异常处理
    console.error(error);
    ElNotification({
        title: '播放异常',
        message: '播放异常',
        type: 'error',
        showClose: false,
        duration: 1000,
      })
  }
}

const rowClassName = ({ row, rowIndex }) => {
  return rowIndex === player.value.index ? 'highlight-row' : '';
}
</script>

<style>
.highlight-row {
  color: #d84f15;
}
</style>