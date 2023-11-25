import { player,currentTab,audio } from "./store.js";
import ContentSearch from "./ContentSearch.vue"
import { getPicUrl,search,getPlaylist } from './request.js'

// 设置歌曲图片
export const setPicUrl = async () => {
    const resp = await getPicUrl({ids:player.value.musicList[player.value.index].id});
    player.value.picUrl = resp.data.songs[0].al.picUrl;
}

// 单曲搜索
export const setMusicList = async() => {
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

    player.value.songList.forEach(item => {
        item.playCount = formatNumber(item.playCount);
        item.bookCount = formatNumber(item.bookCount);
      });

    currentTab.value = ContentSearch;
}

function formatNumber(a) {
    if (a >= 10000) {
        return Math.floor(a / 10000) + 'w';
    } else if (a >= 1000) {
        return Math.floor(a / 1000) + 'k';
    } else {
        return a.toString();
    }
}

// 播放一个歌单
export const playSonglist = async() => {
    player.value.submiting = true;
    const resp = await getPlaylist({ id: player.value.songList[player.value.songIndex].id })
    player.value.submiting = false;
    player.value.index = -1;

    player.value.musicList = [];
    player.value.musicList = resp.data.songs;

    player.value.musicList.forEach(item => {
        item.duration = item.dt;
        item.album = item.al;
        item.artists = item.ar;

        const totalSeconds = Math.floor(item.duration / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        item.duration = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      });
}

// 播放
export function play() {
    audio.src = player.value.url;
    audio.load();
    audio.play();
    player.value.isPlaying = true;
    setPicUrl();
  }