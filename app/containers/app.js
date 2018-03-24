import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'

import Search from './TabBar/search'
import MyMusic from './TabBar/mymusic'
import Friend from './TabBar/friend'
import Account from './TabBar/account'
import Movie from './Movie/movie'
import Music from './Music/music'
import Video from './Video/video'
import PlayList from './PlayList/playlist'
import PlayListDetail from './PlayListDetail/playlistdetail'
import PlayerScene from './PlayerScene/playerscene'

import Login from './Login/login'
import LoginMain from './LoginMain/loginmain'
import Splash from './Splash/splash'

const TabNavContainer = TabNavigator({
    //tab导航栏内容
    Search: { screen: Search },
    MyMusic: { screen: MyMusic },
    Friend: { screen: Friend },
    Account: { screen: Account }
}, {
        // tab导航栏的样式配置
        lazy: true,
        tabBarPosition: 'bottom',
        // 是否切换动画
        animationEnabled: true,
        // 是否滑动
        // swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#aaa',
            showIcon: true,
            style: {
                backgroundColor: '#333',
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        },
        initialRouteName: 'MyMusic'
    })

export default () => {
    // const i = Math.random()
    const App = StackNavigator({
        Splash: { screen: Splash },
        Main: { screen: TabNavContainer },
        Movie: { screen: Movie },
        Music: { screen: Music },
        Video: { screen: Video },
        PlayList: { screen: PlayList },
        PlayListDetail: { screen: PlayListDetail },
        PlayerScene: { screen: PlayerScene },
        Login: { screen: Login },
        LoginMain: { screen: LoginMain }
    }, {
            headerMode: 'screen',
            // initialRouteName: 'Main',
        })
    return <App />
}