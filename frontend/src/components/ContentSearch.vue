<template>
  <el-tabs v-model="player.activeTab" style="margin-left: 30px;" @tab-click="handleClick">
    <el-tab-pane label="单曲" name="first">
      <CSMusicList></CSMusicList>
    </el-tab-pane>
    <el-tab-pane label="歌单" name="second">
      <CSSongList></CSSongList>
    </el-tab-pane>
    <el-tab-pane label="MV" name="thirdly">
      <ContentMVList></ContentMVList>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import ContentMVList from './ContentMVList.vue'
import type { TabsPaneContext } from 'element-plus'
import CSMusicList from './CSMusicList.vue'
import CSSongList from './CSSongList.vue'
import { player } from './store.js'
import { setMusicList, setSongList, setMVList } from './utils'
import { onMounted } from 'vue'

onMounted(() => {
  setMusicList();
})

const handleClick = async (tab: TabsPaneContext, event: Event) => {
  player.value.searchType = tab.index;

  if (player.value.searchValue == '') {
    return;
  }

  if (tab.index == '0') {
    // 单曲搜索,不能切
    // setMusicList();
  } else if (tab.index == '1') {
    // 歌单搜索
    setSongList();
  } else if (tab.index == '2') {
    setMVList();
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
  