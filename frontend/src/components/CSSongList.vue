<template>
  <div style="width: 100%;">
    <el-table :data="player.songList" @row-click="handleRowClick" :row-class-name="rowClassName" empty-text="获取中..." show-overflow-tooltip>
      <el-table-column type="index" label="#" width="50" />
      <el-table-column prop="name" label="标题" />
      <el-table-column prop="creator.nickname" label="创建者" />
      <el-table-column prop="trackCount" label="歌曲数" width="100" />
      <el-table-column prop="playCount" label="播放" width="100" />
      <el-table-column prop="bookCount" label="收藏" width="100" />
    </el-table>
  </div>
</template>
    
<script setup>
import { player } from './store.js'
import { playSonglist, play } from './utils.js';
import { getSong } from './request';

const handleRowClick = async (row, column, event) => {
  // 切换到歌单标签页
  player.value.musicList = [];
  player.value.activeTab = 'first';
  player.value.searchType = '0';

  // 获取歌单
  player.value.songIndex = player.value.songList.indexOf(row);
  await playSonglist();

  // 自动播放第一曲
  const resp = await getSong({ id: player.value.musicList[0].id })
  player.value.url = resp.data.data[0].url;
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