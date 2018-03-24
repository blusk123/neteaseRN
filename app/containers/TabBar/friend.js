import React, { PureComponent } from 'react'
import FriendMain from '../Friend/friend'
import Icon from 'react-native-vector-icons/Ionicons'

//#d43c33

export default class Friend extends PureComponent {
    static navigationOptions = {
        title: '朋友',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-people-outline" size={30} color={tintColor} />
        ),
        headerTitleStyle: {
            color: '#fff'
        },
        headerRight: null,
        headerLeft: null,
        headerStyle: {
            backgroundColor: '#d43c33',
            shadowOpacity: 0,
            height: 48
        },
        gesturesEnabled: false
    }
    render() {
        const { navigation } = this.props
        return (
            <FriendMain navigation={navigation} />
        )
    }
}