// 组件间共享，实现状态管理
import { shallowRef, ref } from 'vue'

import Content1 from './Content/Content1.vue'
import Content2 from './Content/Content2.vue'
import Content3 from './Content/Content3.vue'
import Content4 from './Content/Content4.vue'
import Content5 from './Content/Content5.vue'
import Content6 from './Content/Content6.vue'
import Content7 from './Content/Content7.vue'
import Content8 from './Content/Content8.vue'
import Content9 from './Content/Content9.vue'
import Content10 from './Content/Content10.vue'
import Content11 from './Content/Content11.vue'
import Content12 from './Content/Content12.vue'

import CententSearch from './ContentSearch.vue'


export const currentTab = shallowRef('Content1')     // 表示当前内容组件

// 左侧上导航
export const topTabs = shallowRef([
  { buttonName: '播放列表', iconName: 'HomeFilled', cpn: CententSearch },
  { buttonName: '音乐精选', iconName: 'Service', cpn: Content2 },
  { buttonName: '播客精选', iconName: 'Search', cpn: Content3 },
  { buttonName: '私人漫游', iconName: 'Search', cpn: Content4 },
  { buttonName: '我的社区', iconName: 'ChatDotRound', cpn: Content5 }
])

// 左侧下导航
export const bottomTabs = shallowRef([
  { buttonName: '我的音乐', iconName: 'Clock', cpn: Content6 },
  { buttonName: '最近播放', iconName: 'Clock', cpn: Content7 },
  { buttonName: '我的播客', iconName: 'Search', cpn: Content8 },
  { buttonName: '我的收藏', iconName: 'StarFilled', cpn: Content9 },
  { buttonName: '下载管理', iconName: 'Download', cpn: Content10 },
  { buttonName: '本地音乐', iconName: 'Search', cpn: Content11 },
  { buttonName: '我的云盘', iconName: 'UploadFilled', cpn: Content12 }
])

// 音频对象
export const audio = new Audio();

// 播放信息
export const player = ref({
  "showLyric": false,   // 是否显示歌词
  "lyric": '',          // 当前歌词
  "activeTab": 'first',  // 当前标签页
  "songIndex": -1,       // 歌单索引
  "mvIndex": -1,       // mv索引
  "songList": [],       // 歌单列表
  "musicList": [],      // 播放列表
  "mvList": [],         // MV列表
  "url": '',            // 播放url
  "mvUrl": '',            // mv播放url
  "index": -1,          // 播放索引
  "isPlaying": false,   // 播放状态
  "submiting": false,   // 搜索状态
  "mode": 1,            // 播放模式 1列表循环 2随机播放 3单曲循环
  "searchType": '0',    // 搜索模式 0歌曲 1歌单 2歌词 3MV
  "searchValue": '起风了',     // 上次的搜索值
  "picUrl": '',         // 歌曲图片
  "isMute": false,      // 是否静音
  "currentVolume": 1,   // 当前音量
  "tmpVolume": 1        // 还原音量
});