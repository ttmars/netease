<template>
  <el-tabs style="margin-left: 30px;" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="单曲" name="first">
      <CSMusicList></CSMusicList>
    </el-tab-pane>
    <el-tab-pane label="歌单" name="second">
      <CSSongList></CSSongList>
    </el-tab-pane>
    <el-tab-pane label="歌词" name="third">开发中...</el-tab-pane>
    <el-tab-pane label="MV" name="fourth">开发中...</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import CSMusicList from './CSMusicList.vue'
import CSSongList from './CSSongList.vue'
import { search } from './request.js'
import { player } from './store.js'

const activeName = ref('first')

const handleClick = async (tab: TabsPaneContext, event: Event) => {
  // 搜索歌单
  if (tab.index == '1' && player.value.searchValue != '') {
    const resp = await search({ keywords: player.value.searchValue, type: 1000 })
    player.value.songList = resp.data.result.playlists;
  }
}
</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
  