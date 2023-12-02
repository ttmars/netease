import { player, currentTab, audio } from "./store.js";
import ContentSearch from "./ContentSearch.vue"
import { getPicUrl, search, getPlaylist, getSong, getLyric,getMVLink,getComment } from './request.js'
import { ElNotification } from 'element-plus'

// 设置歌词
export const setLyric = async () => {
    const resp = await getLyric({ id: player.value.musicList[player.value.index].id });
    player.value.lyric = resp.data.lrc.lyric;
    player.value.lyric = formatLrc(player.value.lyric);
}
function formatLrc(LRC) {
    var strLrc = LRC.split("\n");
    let arr = [];
    for (var i = 0; i < strLrc.length; i++) {
        var str = strLrc[i];
        var parts = str.split("]");
        var timeStr = parts[0].substring(1);
        var obj = {
            time: formatTime(timeStr),
            words: parts[1],
        };
        arr.push(obj);
    }
    return arr;
}
function formatTime(time) {
    var parts = time.split(":"); //[03:00.000]==>[03,00.00]
    return +parts[0] * 60 + +parts[1]; //计算秒
  }

// 设置歌曲图片
export const setPicUrl = async () => {
    const resp = await getPicUrl({ ids: player.value.musicList[player.value.index].id });
    player.value.picUrl = resp.data.songs[0].al.picUrl;
}

// 单曲搜索
export const setMusicList = async () => {
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
export const setSongList = async () => {
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

// 获取评论
export const setComment = async () => {
    player.value.commentList = [];
    const resp = await getComment({ id: player.value.musicList[player.value.index].id })
    player.value.commentList = resp.data.hotComments;
}

// MV搜索
export const setMVList = async () => {
    player.value.mvList = [];

    player.value.submiting = true;
    const resp = await search({ keywords: player.value.searchValue, type: 1004 })
    player.value.submiting = false;
    player.value.mvList = resp.data.result.mvs;

    currentTab.value = ContentSearch;
}

// 获取MV播放链接
export const setMVUrl = async () => {
    player.value.submiting = true;
    const resp = await getMVLink({ id: player.value.mvList[player.value.mvIndex].id })
    player.value.submiting = false;
    player.value.mvUrl = resp.data.data.url;

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
export const playSonglist = async () => {
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
export async function play() {
    if (player.value.url == null) {
        ElNotification({
            title: '暂无音源',
            message: player.value.musicList[player.value.index].name,
            type: 'error',
            showClose: false,
            duration: 3000,
        })
        // 下一曲
        player.value.index++;
        if (player.value.index == player.value.musicList.length) {
            player.value.index = 0;
        }
        const resp = await getSong({ id: player.value.musicList[player.value.index].id })
        player.value.url = resp.data.data[0].url;
        play();
    } else {
        audio.src = player.value.url;
        audio.load();
        audio.play();
        player.value.isPlaying = true;
        setPicUrl();
        setLyric();
        audio.playbackRate = player.value.speed;
    }
}