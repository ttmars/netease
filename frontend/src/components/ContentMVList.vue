<template>
    <div style="display: flex; flex-wrap: wrap;">
        <video-player class="video" @playing="playingHandle" :src="player.mvUrl" :loop="false" :volume="1" controls autoplay
            :poster="player.mvIndex != -1 && player.mvIndex < player.mvList.length ? player.mvList[player.mvIndex].cover : ''" />

        <div v-for="(item, idx) in player.mvList">
            <div class="mv">
                <img style="cursor: pointer;" :src="item.cover" @click="playMv(idx)">
                <el-text> {{ item.name }} {{ item.id }} </el-text>
            </div>
        </div>
    </div>
</template>

<script setup>
import { player } from './store.js'
import { setMVUrl } from './utils.js'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { audio } from './store.js'

const playMv = async (idx) => {
    player.value.mvIndex = idx;
    await setMVUrl();
    // 播放mv
}

const playingHandle = () => {
    audio.pause();
    player.value.isPlaying = false;
}

</script>

<style>
.video {
    width: 290px;
    height: 162px;
    margin: 10px;
}

.mv {
    width: 290px;
    /* height: 230px; */
    margin: 10px;
    display: flex;
    flex-direction: column;
}
</style>