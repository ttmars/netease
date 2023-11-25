// 组件间共享，实现状态管理
import { shallowRef, ref } from 'vue'

import ContentMyCollection from './ContentMyCollection.vue'
import ContentMyFavorite from './ContentMyFavorite.vue'
import ContentDefault from './ContentDefault.vue'

export const currentTab = shallowRef('ContentMyCollection')     // 表示当前内容组件

// 左侧上导航
export const topTabs = shallowRef([
  { buttonName: '为我推荐', iconName: 'HomeFilled', cpn: ContentDefault },
  { buttonName: '音乐精选', iconName: 'Service', cpn: ContentDefault },
  { buttonName: '播客精选', iconName: 'Search', cpn: ContentDefault },
  { buttonName: '私人漫游', iconName: 'Search', cpn: ContentDefault },
  { buttonName: '我的社区', iconName: 'ChatDotRound', cpn: ContentDefault }
])

// 左侧下导航
export const bottomTabs = shallowRef([
  { buttonName: '我的音乐', iconName: 'Clock', cpn: ContentMyFavorite },
  { buttonName: '最近播放', iconName: 'Clock', cpn: ContentDefault },
  { buttonName: '我的播客', iconName: 'Search', cpn: ContentDefault },
  { buttonName: '我的收藏', iconName: 'StarFilled', cpn: ContentMyCollection },
  { buttonName: '下载管理', iconName: 'Download', cpn: ContentDefault },
  { buttonName: '本地音乐', iconName: 'Search', cpn: ContentDefault },
  { buttonName: '我的云盘', iconName: 'UploadFilled', cpn: ContentDefault }
])

// 音频对象
export const audio = new Audio();

// 播放信息
export const player = ref({
  "songList": [],       // 歌单列表
  "musicList": [],      // 播放列表
  "url": '',            // 播放url
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