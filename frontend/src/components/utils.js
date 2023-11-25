import { player } from "./store";
import { getPicUrl } from "./request";
import { currentTab } from "./store";
import ContentSearch from "./ContentSearch.vue"
import { search } from './request.js'

// 设置歌曲图片
export const setPicUrl = async () => {
    const resp = await getPicUrl({ids:player.value.musicList[player.value.index].id});
    player.value.picUrl = resp.data.songs[0].al.picUrl;
}

// 单曲搜索
export const setMusicList = async() => {
    player.value.index = -1;
    player.value.musicList = [];

    player.value.submiting = true;
    const resp = await search({ keywords: player.value.searchValue })
    player.value.submiting = false;

    player.value.musicList = resp.data.result.songs;
    // 格式化时间
    player.value.musicList.forEach(item => {
      const totalSeconds = Math.floor(item.duration / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      item.duration = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    });
    currentTab.value = ContentSearch;
}

// 歌单搜索
export const setSongList = async() => {
    player.value.songList = [];

    player.value.submiting = true;
    const resp = await search({ keywords: player.value.searchValue, type: 1000 })
    player.value.submiting = false;
    player.value.songList = resp.data.result.playlists;
    currentTab.value = ContentSearch;
}