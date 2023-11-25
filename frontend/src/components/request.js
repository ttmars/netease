import axios from 'axios';

// https://apifox.com/apiskills/axios-request-encapsulation/
// https://github.com/axios/axios

const service = axios.create({
    baseURL: 'http://39.101.203.25:3000',
    timeout: 5000
})

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
