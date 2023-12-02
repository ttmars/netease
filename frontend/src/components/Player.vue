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
                    <el-button circle size="large" class="bt-none" @click="picClick">
                        <template #icon>
                            <img v-if="player.picUrl != ''" :src="player.picUrl" alt="" width="50" height="50">
                            <img v-else src="../assets/光碟.svg" alt="" width="50" height="50">
                        </template>
                    </el-button>
                </div>
                <div style="display: flex; flex-direction: column;">
                    <div
                        style="margin-top: 10px; margin-bottom: 10px; width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        {{ player.index != -1 && player.index < player.musicList.length ?
                            player.musicList[player.index].name : "天天网抑云" }} </div>
                            <div style="display: flex;">
                                <el-button circle style="border: none;" @click="changeLoveStatus">
                                    <template #icon>
                                        <img v-if="loveStatus" src="../assets/红心.svg" alt="" width="13" height="13">
                                        <img v-else src="../assets/黑心.svg" alt="" width="13" height="13">
                                    </template>
                                </el-button>
                                <!-- <el-button circle style="border: none;" icon="ChatDotRound"></el-button> -->

                                <el-button circle style="border: none;" icon="CopyDocument" @click="copyClick"></el-button>
                                <el-button circle style="border: none;" icon="Download" @click="downloadClick"></el-button>
                                <el-button circle style="border: none;" icon="ChatDotSquare"
                                    @click="commentClick"></el-button>
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
                    <el-button circle style="border: none;"
                        @click="player.showLyric = !player.showLyric"><b :style="{ color: player.showLyric ? 'cadetblue' : 'black' }">词</b></el-button>
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
                <!-- <el-button size="large" style="border: none;" circle icon="Expand" @click="showList" /> -->

                <!-- 播放速度 -->
                <el-popover placement="top" :width="200" trigger="hover" :hide-after="0">
                    <template #reference>
                        <el-button size="large" style="border: none;" circle @click="showList" text>x{{ player.speed
                        }}</el-button>
                    </template>
                    <el-slider v-model="player.speed" :min="0" :max="2" :step="0.1" @input="speedHandle" size="small" />
                </el-popover>

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

        <!-- 右侧评论抽屉 -->
        <el-drawer v-model="drawer" title="精彩评论" size="40%">
            <div v-for="item in player.commentList">
                <div style="display: flex;">
                    <div style="margin-right: 10px;">
                        <img :src="item.user.avatarUrl" alt="" width="50" height="50">
                    </div>
                    <div style="display: flex; flex-direction: column; width: 100%;">
                        <div style="font-size: 12px; margin-bottom: 5px; color:blueviolet">{{ item.user.nickname }}</div>
                        <div style="margin-bottom: 10px;">{{ item.content }}</div>
                        <div style="font-size: 10px;">{{ item.timeStr }}</div>
                        <div><el-divider /></div>
                    </div>
                </div>
            </div>
        </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { audio, currentTab, player } from './store.js'
import ContentSearch from './ContentSearch.vue'
import { getSong } from './request.js'
import { play, setComment } from './utils.js'
import { ElNotification } from 'element-plus'

const drawer = ref(false);
const commentClick = async () => {
    drawer.value = true;
    await setComment();
}

// 格式化
const musicDuration = ref('00:00');
const currentDuration = ref('00:00');
const musicDurationNumber = ref(0);
const currentDurationNumber = ref(0);
const loveStatus = ref(false);

const changeLoveStatus = () => {
    loveStatus.value = !loveStatus.value;
}

// 复制播放链接
const copyClick = () => {
    navigator.clipboard.writeText(player.value.url);
    ElNotification({
        title: 'Success',
        message: '已复制链接',
        type: 'success',
        showClose: false,
        duration: 1000,
    })
}

// 下载文件
const downloadClick = () => {
    // window.open(player.value.url);
    ElNotification({
        title: 'Success',
        message: '已开始下载',
        type: 'success',
        showClose: false,
        duration: 1000,
    })
    if (player.value.index != -1 && player.value.index < player.value.musicList.length) {
        downloadMp3(player.value.url, player.value.musicList[player.value.index].name);
    }
}
function downloadMp3(filePath, fileName) {
    fetch(filePath).then(res => res.blob()).then(blob => {
        const a = document.createElement('a');
        document.body.appendChild(a)
        a.style.display = 'none'
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url);
    });
}

const changeMode = () => {
    player.value.mode++;
    if (player.value.mode == 4) {
        player.value.mode = 1;
    }
}

const picClick = () => {
    currentTab.value = ContentSearch;
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
    player.value.url = resp.data.data[0].url;
    play();
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

// 调节播放速度
const speedHandle = (val) => {
    audio.playbackRate = val;
    player.value.speed = val;
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
        player.value.url = resp.data.data[0].url;
        play();
    } catch (error) {
        // 异常处理
        console.error(error);
    }
}

// 上一曲
const preClick = async () => {
    try {
        player.value.index--;
        if (player.value.index == -1) {
            player.value.index = player.value.musicList.length - 1;
        }
        const resp = await getSong({ id: player.value.musicList[player.value.index].id })
        player.value.url = resp.data.data[0].url;
        play();
    } catch (error) {
        // 异常处理
        console.error(error);
    }
}
</script>

<style></style>