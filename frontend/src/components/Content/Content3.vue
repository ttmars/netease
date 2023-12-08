<template>
    <KeepAlive>
        <div style="display: flex; flex-direction: column;">
            <div style="display: flex; flex-wrap: wrap;">
                <div v-for="(item, idx) in player.topList">
                    <div class="cell">
                        <img class="img" style="cursor: pointer;" loading="lazy" :src="item.coverImgUrl"
                            @click="playTop(idx)">
                    </div>
                </div>
            </div>
        </div>
    </KeepAlive>
</template>


<script setup>
import { player, currentTab } from '../store.js'
import { playToplist, play } from '../utils.js';
import { getSong } from '../request';
import ContentSearch from "../ContentSearch.vue"

const playTop = async (idx) => {
    player.value.musicList = [];
    player.value.activeTab = 'first';
    player.value.searchType = '0';

    // 切换到播放列表
    currentTab.value = ContentSearch;

    // 获取歌单
    player.value.topIndex = idx;
    await playToplist();

    // 自动播放第一曲
    const resp = await getSong({ id: player.value.musicList[0].id })
    player.value.url = resp.data.data[0].url;
    player.value.index = 0;
    play();
}

</script>

<style scoped>
.img {
    width: 100%;
    height: 100%;
}

.cell {
    width: 200px;
    height: 200px;
    margin-left: 30px;
    margin-top: 30px;
}
</style>