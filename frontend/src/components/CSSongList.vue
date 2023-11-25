<template>
  <div style="width: 100%;">
    <el-table :data="player.songList" @row-click="handleRowClick" :row-class-name="rowClassName" empty-text="搜索中...">
      <el-table-column type="index" label="#" />
      <el-table-column prop="name" label="标题" />
      <el-table-column prop="trackCount" label="歌曲数" />
      <el-table-column prop="creator.nickname" label="创建者" />
      <el-table-column prop="playCount" label="播放量" />
      <el-table-column prop="bookCount" label="订阅量" />
    </el-table>
  </div>
</template>
    
<script setup>
import { player } from './store.js'
import { playSonglist, play } from './utils.js';
import { getSong } from './request';

const handleRowClick = async (row, column, event) => {
  // 获取歌单
  player.value.songIndex = player.value.songList.indexOf(row);
  await playSonglist();

  // 自动播放第一曲
  const resp = await getSong({ id: player.value.musicList[0].id })
  player.value.currentMusicUrl = resp.data.data[0].url;
  player.value.index = 0;
  play();
}

const rowClassName = ({ row, rowIndex }) => {
  return rowIndex === player.value.songIndex ? 'highlight-row' : '';
}

</script>
  
<style>
.highlight-row {
  color: #d84f15;
}
</style>