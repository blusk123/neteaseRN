import { combineReducers } from 'redux'

import banner from './banner'
import personal from './personal'
import personnew from './personnew'
import persondj from './persondj'
import personmv from './personmv'
import mainnav from './navigation'
import songmore from './songmore'

import topalbum from './topalbum'

import playlisth from './playlisth'
import playlist from './playlist'
import playlistd from './playlistd'

import music from './musicurl'
import mcindex from './mc_index'
import songs from './songs'
import slider from './slider'

import uid from './uid'

import userpl from './userplaylist'

import event from './event'

export default combineReducers({
    banner,
    personal,
    personnew,
    persondj,
    personmv,
    mainnav,
    playlisth,
    playlist,
    playlistd,
    topalbum,
    songmore,
    music,
    mcindex,
    songs,
    slider,
    uid,
    userpl,
    event
})