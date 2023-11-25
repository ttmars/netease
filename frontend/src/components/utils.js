import { player } from "./store";
import { getPicUrl } from "./request";

// 设置歌曲图片
export const setPicUrl = async () => {
    const resp = await getPicUrl({ids:player.value.musicList[player.value.index].id});
    player.value.picUrl = resp.data.songs[0].al.picUrl;
}