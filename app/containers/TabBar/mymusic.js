import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import MyMusicMian from '../MyMusic/mymusic'
import Icon from 'react-native-vector-icons/Ionicons'

//#d43c33
const headerIcon = {
    backgroundColor: "transparent",
    underlayColor: "transparent",
    activeOpacity: 0.8,
    size: 30
}

export default class MyMusic extends PureComponent {
    static navigationOptions = ({navigation}) =>({
        title: '我的音乐',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-musical-notes-outline" size={30} color={tintColor} />
        ),
        headerRight: (
            <Icon.Button onPress={() => {
                navigation.navigate('PlayerScene')
            }} 
            {...headerIcon} name="ios-stats-outline" />
        ),
        headerLeft: (
            <Icon.Button {...headerIcon}>
                <Text style={{color: '#fff', fontSize: 16}}>更多</Text>
            </Icon.Button>
        ),
        headerTitleStyle: {
            color: '#fff'
        },
        headerStyle: {
            backgroundColor: '#d43c33',
            shadowOpacity: 0,
            height: 48
        },
        gesturesEnabled: false
    })
    render() {
        const { navigation } = this.props
        return (
            <MyMusicMian navigation={navigation} />
        )
    }
}