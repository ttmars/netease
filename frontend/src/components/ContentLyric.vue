<!-- https://blog.csdn.net/2303_76218115/article/details/129657440 -->
<template>
  <div class="hello">
    <audio :src="music" @timeupdate="audioTime" controls></audio>
    <div :class="className" :style="{ 'animation-duration': `${lrcTime}000ms` }">
      {{ dataWords }}
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      className: "text load",
      lrcTime: "",
      music: "http://m801.music.126.net/20231125231322/46fed984bd2fcfa80b64ab098398b538/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481711284/6dc0/f58f/bc29/cd16662177fd431d137cb5837c1be8d1.mp3",
      currenttime: "",
      LRC: "[00:00.000] 作词 : 米果\n[00:01.000] 作曲 : 高橋優\n[00:02.000] 编曲 : 池窪浩一 (Kouichi Ikekubo)\n[00:25.237]这一路上走走停停\n[00:28.592]顺着少年漂流的痕迹\n[00:31.681]迈出车站的前一刻\n[00:34.795]竟有些犹豫\n[00:37.794]不禁笑这近乡情怯\n[00:41.191]仍无可避免\n[00:43.819]而长野的天\n[00:45.134]依旧那么暖\n[00:46.684]风吹起了从前\n[00:49.153]从前初识这世间\n[00:52.185]万般流连\n[00:53.962]看着天边似在眼前\n[00:56.798]也甘愿赴汤蹈火去走它一遍\n[01:01.966]如今走过这世间\n[01:05.001]万般流连\n[01:06.632]翻过岁月不同侧脸\n[01:09.861]措不及防闯入你的笑颜\n[01:15.513]我曾难自拔于世界之大\n[01:19.605]也沉溺于其中梦话\n[01:22.837]不得真假 不做挣扎 不惧笑话\n[01:28.501]我曾将青春翻涌成她\n[01:31.930]也曾指尖弹出盛夏\n[01:35.281]心之所动 且就随缘去吧\n[01:41.156]逆着光行走 任风吹雨打\n[01:58.028]短短的路走走停停\n[02:01.171]也有了几分的距离\n[02:04.236]不知抚摸的是故事 还是段心情\n[02:10.711]也许期待的不过是 与时间为敌\n[02:16.193]再次看到你\n[02:17.991]微凉晨光里\n[02:19.556]笑得很甜蜜\n[02:22.116]从前初识这世间\n[02:24.937]万般流连\n[02:26.663]看着天边似在眼前\n[02:29.616]也甘愿赴汤蹈火去走它一遍\n[02:34.711]如今走过这世间\n[02:37.657]万般流连\n[02:39.389]翻过岁月不同侧脸\n[02:42.360]措不及防闯入你的笑颜\n[02:48.265]我曾难自拔于世界之大\n[02:52.336]也沉溺于其中梦话\n[02:55.538]不得真假 不做挣扎 不惧笑话\n[03:01.140]我曾将青春翻涌成她\n[03:05.235]也曾指尖弹出盛夏\n[03:08.062]心之所动 且就随缘去吧\n[03:39.324]晚风吹起你鬓间的白发\n[03:43.574]抚平回忆留下的疤\n[03:46.788]你的眼中 明暗交杂 一笑生花\n[03:52.294]暮色遮住你蹒跚的步伐\n[03:56.330]走进床头藏起的画\n[03:59.544]画中的你 低着头说话\n[04:05.074]我仍感叹于世界之大\n[04:08.784]也沉醉于儿时情话\n[04:12.150]不剩真假 不做挣扎 无谓笑话\n[04:17.925]我终将青春还给了她\n[04:21.677]连同指尖弹出的盛夏\n[04:25.007]心之所动 就随风去了\n[04:30.601]以爱之名 你还愿意吗\n[04:38.541]\n[04:43.799] 吉他 : 池窪浩一 (Kouichi Ikekubo)\n[04:49.057] 贝斯 : 小島剛広 (Takehiro Kojima)\n[04:54.315] 鼓 : 吉田佳史 (TRICERATOPS) (Yoshifumi Yoshida(TRICERATOPS))\n[04:59.573] 键盘 : 平畑徹也 (Tetsuya Hirahata)\n[05:04.831] 小提琴 : 須磨和声 (Wasei Suma)\n[05:10.089] 弦乐 : 須磨和声/池窪浩一\n[05:15.347] 录音工程 : 玉乃井光紀 (Mitsunori Tamanoi) - studioFine\n[05:20.605] 发行 : Negia Entertainment Inc.\n[05:25.863] 特别支持：中村光雄(Mitsuo Nakamura)\n",
      lrcData: "",
      dataWords: "",
    };
  },
  name: "HelloWorld",
  methods: {
    //歌词数据转化为数组
    formatLrc() {
      var strLrc = this.LRC.split("\n");
      let arr = [];
      for (var i = 0; i < strLrc.length; i++) {
        var str = strLrc[i];
        var parts = str.split("]");
        var timeStr = parts[0].substring(1);
        var obj = {
          time: this.formatTime(timeStr),
          words: parts[1],
        };
        arr.push(obj);
      }
      this.lrcData = arr;
    },
    //时间转换（秒）
    formatTime(time) {
      var parts = time.split(":"); //[03:00.000]==>[03,00.00]
      return +parts[0] * 60 + +parts[1]; //计算秒
    },
    audioTime(e) {
      var time = e.target.currentTime; //当前播放器时间
      for (var i = 0; i < this.lrcData.length; i++) {
        if (time < this.lrcData[i].time) {
          //循环歌词数组，当播放器当前时间第一次小于歌词时间时当前数组下标减一即为当前时间数组所对应歌词下标
          this.lrcTime = this.lrcData[i].time - this.lrcData[i - 1].time;
          this.dataWords = this.lrcData[i - 1].words;
          return i - 1;
        }
      }
    },
  },
  watch: {
    dataWords() {
      this.className = "text";
      setTimeout(() => {
        this.className = "text load";
      }, 50);
    },
  },
  mounted() {
    this.formatLrc();
  },
};
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