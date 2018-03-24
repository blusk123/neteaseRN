import React, { PureComponent } from 'react'
import { TabNavigator } from 'react-navigation'
import { View, Text } from 'react-native'

import Recommend from './subpage/recommend'
import Song from './subpage/song'
import Radio from './subpage/radio'
import Ranking from './subpage/ranking'

export default class SearchMain extends PureComponent {
    render() {
        const MainContainer = TabNavigator({
            recommend: { screen: Recommend },
            song: { screen: Song },
            radio: { screen: Radio },
            ranking: { screen: Ranking  }
        }, {
            // tab导航栏的样式配置
            lazy: true,
            tabBarPosition: 'top',
            // 是否切换动画
            animationEnabled: true,
            // 是否滑动
            swipeEnabled: true,
            tabBarOptions: {
                activeTintColor: '#d43c33',
                inactiveTintColor: '#000',
                showIcon: true,
                showLabel: false,
                style: {
                    backgroundColor: '#fff',
                },
                indicatorStyle: {
                    opacity: 0
                },
                tabStyle: {
                    padding: 0,
                },
                labelStyle: {
                    height: 0
                },
            },
            initialRouteName: 'recommend',
        })
        return (
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
               <MainContainer /> 
            </View>
        )
    }
}