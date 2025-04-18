import axios from 'axios';

// https://apifox.com/apiskills/axios-request-encapsulation/
// https://github.com/axios/axios

// 跨域？
// https://blog.csdn.net/moshowgame/article/details/107285660
// https://juejin.cn/post/7070425184796147719
// https://zhuanlan.zhihu.com/p/615153283
axios.defaults.crossDomain = true

const service = axios.create({
    // baseURL: 'http://8.138.217.221:4000',
    baseURL: 'http://8.138.217.221:3000',
    // baseURL: 'https://api-007.alin.top',
    timeout: 10000
})

// 获取榜单
export const getTopList = () => {
    return service({
        url: '/toplist',
        method: 'get',
    })
}

// 搜索
export const search = (params) => {
    return service({
        url: '/search',
        method: 'get',
        params           // post data
    })
}

// 获取音乐url
export const getSong = (params) => {
    return service({
        url: '/song/url',
        method: 'get',
        params
    })
}

// 获取音乐picUrl
export const getPicUrl = (params) => {
    return service({
        url: '/song/detail',
        method: 'get',
        params
    })
}

// 获取歌单所有歌曲
export const getPlaylist = (params) => {
    return service({
        url: '/playlist/track/all',
        method: 'get',
        params
    })
}

// 获取歌词
export const getLyric = (params) => {
    return service({
        url: '/lyric',
        method: 'get',
        params
    })
}

// 获取mv播放链接
export const getMVLink = (params) => {
    return service({
        url: '/mv/url',
        method: 'get',
        params
    })
}

// 获取歌曲评论
export const getComment = (params) => {
    return service({
        url: '/comment/music',
        method: 'get',
        params
    })
}
