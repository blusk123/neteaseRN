import { get } from '../Utils/get'

const api = 'http://yourIP:3000'

//获取轮播图
export const getBanner = () => get(api + '/banner')

//获取推荐歌单
export const getPersonalized = () => get(api + '/personalized')

//获取推荐音乐
export const getPersonalizedNew = () => get(api + '/personalized/newsong')

//获取推荐电台
export const getPersonalizedDJ = () => get(api + '/personalized/djprogram')

//获取推荐mv
export const getPersonalizedMV = () => get(api + '/personalized/mv')

//获取新碟上架
export const getTopAlbum = (item) => get(api + '/top/album', item)

//获取精品歌单
export const getPlayListH = (item) => get(api + '/top/playlist/highquality', item)

//获取歌单
export const getPlayList = (item) => get(api + '/top/playlist', item)

//获取歌单详情
export const getPlayListDetail = (item) => get(api + '/playlist/detail', item)

//获取歌曲信息
export const getMusicUrl = (item) => get(api + '/music/url', item)

//登录接口
export const getLogin = (item) => get(api + '/login/cellphone', item)

//刷新登录状态
export const refresh = (item) => get(api + '/login/refresh', item)

//获取用户信息
export const getUserInfo = (item) => get(api + '/user/subcount', item)

//获取用户详情
export const getUserDetail = (item) => get(api + '/user/detail', item)

//获取用户歌单
export const getUserPlayList = (item) => get(api + '/user/playlist', item)

//获取动态消息
export const getEvent = (item) => get(api + '/event', item)

//获取当前歌词
export const getLyric = (item) => get(api + '/lyric', item)

//获取排行榜
export const getTopList = (item) => get(api + '/top/list', item)

