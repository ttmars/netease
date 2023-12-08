<template>
    <el-button class="left-nav-button" style="margin-left: 30px; margin-top: 20px;" @click="playAll" icon="CaretRight">播放全部</el-button>
    <div style="margin-left: 30px; width: 90%;">
        <el-table :data="player.loveList" empty-text="空空如也~" show-overflow-tooltip>
            <el-table-column type="index" label="#" width="50" />
            <!-- <el-table-column prop="ID" label="ID" />
            <el-table-column prop="SongName" label="歌名" />
            <el-table-column prop="SingerName" label="歌手" /> -->

            <el-table-column prop="" label="歌曲">
                <template #default="scope">
                    {{ scope.row.SongName }} - {{ scope.row.SingerName }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { player, currentTab } from '../store.js'
import { setLoveList } from '../utils.js'
import { onMounted } from "vue";
import ContentSearch from "../ContentSearch.vue"
import { play } from '../utils';
import { getSong } from '../request.js'

onMounted(() => {
    setLoveList();
})

const playAll = async () => {
    let arr = []
    player.value.loveList.forEach(function (item, index) {
        arr.push({ "id": item.ID, "name": item.SongName, "artists": [{ "name": item.SingerName }] })
    })
    player.value.musicList = arr;
    currentTab.value = ContentSearch;
    // 自动播放
    player.value.index = 0;
    const resp = await getSong({ id: player.value.musicList[player.value.index].id })
    player.value.url = resp.data.data[0].url;
    play();
}
</script>

<style scoped>
/* 
自定义按钮样式、动态组件
https://www.cnblogs.com/dengzhaowei/p/15698878.html 
https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components
*/
.left-nav-button {
    /* 高不用设置，让字体大小自然撑开 */
    /* height: 40px; */
    width: 100px;
    margin-bottom: 10px;
    margin-left: 10px;
    border-radius: 10px;
    font-size: 15px;
    border: transparent;
    overflow: hidden;

    text-align: left;
    background: linear-gradient(139deg, #dd2e9b 0%, #f47039 99%);
    color: white;

    /* 鼠标悬浮 */
    &:hover {
        background: linear-gradient(139deg, #dd2e9b 0%, #f47039 99%);
        color: white;
    }

    /* 点击 */
    /* &:focus{
    background: #fc3d49;
    color: white;
  } */
}
</style>