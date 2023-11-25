<template>
  <div style="width: 100%;">
    <el-table :data="player.musicList" @row-click="handleRowClick" :row-class-name="rowClassName"
      empty-text="搜索总...">
      <el-table-column type="index" label="#" />
      <!-- <el-table-column prop="id" label="ID" /> -->
      <el-table-column prop="name" label="标题" />
      <el-table-column prop="artists[0].name" label="歌手" />
      <el-table-column prop="album.name" label="专辑" />
      <el-table-column prop="duration" label="时长" />
    </el-table>
  </div>
</template>
  
<script setup>
import { audio, player } from './store.js'
import { getSong } from './request.js'
import { setPicUrl } from './utils';

const handleRowClick = async (row, column, event) => {
  try {
    player.value.index = player.value.musicList.indexOf(row);
    const resp = await getSong({ id: player.value.musicList[player.value.index].id })
    player.value.currentMusicUrl = resp.data.data[0].url;
    play();
  } catch (error) {
    // 异常处理
    console.error(error);
  }
  setPicUrl();
}

function play() {
  audio.src = player.value.currentMusicUrl;
  audio.load();
  audio.play();
  player.value.isPlaying = true;
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