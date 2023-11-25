<!-- 50586b 播放器黑色-->
<!-- b8bcc3 按钮灰色 -->
<!-- fc3c4a 红心 -->
<!-- https://www.iconfont.cn/collections/detail?spm=a313x.search_index.0.da5a778a4.7dde3a81LghGZL&cid=18940 -->

<template>
    <div style="display: flex;">
        <!-- 左 -->
        <div style="display: flex; flex: 1;">
            <div style="display: flex;">
                <div style="display: flex; justify-content: center; align-items: center; margin: 15px;">
                    <el-button circle size="large" class="bt-none">
                        <template #icon>
                            <img v-if="player.picUrl != ''" :src="player.picUrl" alt="" width="50" height="50">
                            <img v-else src="../assets/光碟.svg" alt="" width="50" height="50">
                        </template>
                    </el-button>
                </div>
                <div style="display: flex; flex-direction: column;">
                    <div style="margin-top: 10px; margin-bottom: 10px;"> {{ player.index != -1 && player.index <
                        player.musicList.length ? player.musicList[player.index].name : "天天网抑云" }} </div>
                            <div style="display: flex;">
                                <el-button circle style="border: none;">
                                    <template #icon>
                                        <img src="../assets/红心.svg" alt="" width="13" height="13">
                                    </template>
                                </el-button>
                                <el-button circle style="border: none;" icon="ChatDotRound"></el-button>
                                <el-button circle style="border: none;" icon="Download"></el-button>
                                <el-button circle style="border: none;" icon="MoreFilled"></el-button>
                            </div>
                    </div>
                </div>
            </div>

            <!-- 中 -->
            <div style="display: flex; flex: 2; flex-direction: column;">
                <!-- 上 -->
                <div style="display: flex; justify-content: center;">
                    <el-button circle style="border: none;" @click="changeMode">
                        <template #icon>
                            <img v-if="player.mode === 1" src="../assets/列表循环.svg" alt="" width="20" height="20">
                            <img v-else-if="player.mode === 2" src="../assets/随机播放.svg" alt="" width="20" height="20">
                            <img v-else-if="player.mode === 3" src="../assets/单曲循环.svg" alt="" width="20" height="20">
                        </template>
                    </el-button>
                    <el-button circle style="border: none;" @click="preClick">
                        <template #icon>
                            <img src="../assets/上一曲.svg" alt="" width="13" height="13">
                        </template>
                    </el-button>
                    <el-button circle style="border: none;" @click="togglePlayPause">
                        <template #icon>
                            <!-- <img :src="isPlaying ? '/src/assets/暂停.svg' : '/src/assets/播放.svg'" alt="" width="13" height="13"> -->
                            <img v-if="player.isPlaying" src="../assets/暂停.svg" alt="" width="13" height="13">
                            <img v-else src="../assets/播放.svg" alt="" width="13" height="13">
                        </template>
                    </el-button>
                    <el-button circle style="border: none;" @click="nextClick">
                        <template #icon>
                            <img src="../assets/下一曲.svg" alt="" width="13" height="13">
                        </template>
                    </el-button>
                    <el-button circle style="border: none;"><b>词</b></el-button>
                </div>

                <!-- 下 -->
                <div style="display: flex;">
                    <el-text style="width: 45px;">{{ currentDuration }}</el-text>
                    <el-slider style="margin-left: 15px;margin-right: 15px;" v-model="currentDurationNumber"
                        :max="musicDurationNumber" @change="changeCurrentProgress" />
                    <el-text style="width: 45px;">{{ musicDuration }}</el-text>
                </div>
            </div>

            <!-- 右 -->
            <div style="display: flex; flex: 1;justify-content: flex-end; align-items: center;">
                <el-button size="large" style="border: none;" circle icon="Expand" @click="showList" />

                <el-button size="large" circle style="border: none;" @click="switchMute">
                    <template #icon>
                        <img v-if="player.isMute" src="../assets/静音.svg" alt="" width="13" height="13">
                        <img v-else src="../assets/减小音量.svg" alt="" width="13" height="13">
                    </template>
                </el-button>

                <el-slider style="width: 60px; margin-right: 50px;margin-left: 20px;" v-model="player.currentVolume" :max=1
                    :step=0.01 @input="changeCurrentVolume" />
            </div>
        </div>
</template>

<script setup>
import { ref } from 'vue'
import { audio, currentTab, player } from './store.js'
import ContentSearch from './ContentSearch.vue'
import { getSong } from './request.js'
import { setPicUrl } from './utils';

// 格式化
const musicDuration = ref('00:00');
const currentDuration = ref('00:00');
const musicDurationNumber = ref(0);
const currentDurationNumber = ref(0);

const changeMode = () => {
    player.value.mode++;
    if (player.value.mode == 4) {
        player.value.mode = 1;
    }
}

// 监听音频事件
audio.addEventListener('timeupdate', () => {
    musicDurationNumber.value = audio.duration;
    currentDurationNumber.value = audio.currentTime;

    musicDuration.value = formatTime(audio.duration);
    currentDuration.value = formatTime(audio.currentTime);
});

// 播放完毕
audio.onended = async function () {
    if (player.value.mode == 1) {
        player.value.index++;
    } else if (player.value.mode == 2) {
        player.value.index = getRandomInt(0, player.value.musicList.length);
    } else if (player.value.mode == 3) {
        play();
        return;
    }

    if (player.value.index == player.value.musicList.length) {
        player.value.index = 0;
    }

    const resp = await getSong({ id: player.value.musicList[player.value.index].id })
    player.value.currentMusicUrl = resp.data.data[0].url;
    play();
    setPicUrl();
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 歌曲时间格式化
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    // 使用padStart确保始终是两位数
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// 播放/暂停
const togglePlayPause = () => {
    if (player.value.isPlaying) {
        audio.pause()
    } else {
        audio.play()
    }
    player.value.isPlaying = !player.value.isPlaying
}

// 滑动进度条
const changeCurrentProgress = (val) => {
    audio.currentTime = val;
}

// 调节音量
const changeCurrentVolume = (val) => {
    audio.volume = val;
    player.value.tmpVolume = val;
}

// 切换静音模式
const switchMute = () => {
    player.value.isMute = !player.value.isMute;
    if (audio.volume == 0) {
        audio.volume = player.value.tmpVolume;
        player.value.currentVolume = player.value.tmpVolume;
    } else {
        audio.volume = 0;
        player.value.currentVolume = 0;
    }
}

// 显示播放列表
const showList = () => {
    currentTab.value = ContentSearch;
}

// 下一曲
const nextClick = async () => {
    try {
        player.value.index++;
        if (player.value.index == player.value.musicList.length) {
            player.value.index = 0;
        }
        const resp = await getSong({ id: player.value.musicList[player.value.index].id })
        player.value.currentMusicUrl = resp.data.data[0].url;
        play();
    } catch (error) {
        // 异常处理
        console.error(error);
    }
    setPicUrl();
}

// 上一曲
const preClick = async () => {
    try {
        player.value.index--;
        if (player.value.index == -1) {
            player.value.index = player.value.musicList.length - 1;
        }
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
</script>

<style></style>