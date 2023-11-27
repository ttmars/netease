<!-- https://blog.csdn.net/2303_76218115/article/details/129657440 -->
<template>
  <div style="display: flex; width: 100%; height: 100%; align-items: center; justify-content: center;">
    <div :class="className" :style="{ 'animation-duration': `${lrcTime}000ms` }">
      {{ dataWords }}
    </div>
  </div>
</template>
 
<script setup>
import { ref, watch } from 'vue';
import { audio, player } from './store';

const className = ref("text load");
const lrcTime = ref("");
const dataWords = ref("");

audio.addEventListener('timeupdate', (e) => {
  var time = e.target.currentTime; //当前播放器时间
  for (var i = 0; i < player.value.lyric.length; i++) {
    if (time < player.value.lyric[i].time) {
      //循环歌词数组，当播放器当前时间第一次小于歌词时间时当前数组下标减一即为当前时间数组所对应歌词下标
      lrcTime.value = player.value.lyric[i].time - player.value.lyric[i - 1].time;
      dataWords.value = player.value.lyric[i - 1].words;
      return i - 1;
    }
  }
});

watch(dataWords, () => {
  className.value = "text";
  setTimeout(() => {
    className.value = "text load";
  }, 50);
});


</script> 
<style scoped>
@keyframes scan {
  0% {
    background-size: 0 100%;
  }

  100% {
    background-size: 100% 100%;
  }
}

.text {
  background: #7e7e7e -webkit-linear-gradient(left, #76ca16, #0fa046) no-repeat 0 0;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-size: 0 100%;
}

.load {
  background-size: 100% 100%;
  animation: scan linear;
}
</style>