import React, { PureComponent } from 'react'
import AccountMain from '../Account/account'
import Icon from 'react-native-vector-icons/Ionicons'

//#d43c33

export default class Account extends PureComponent {
    static navigationOptions = {
        title: '账户',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-person-outline" size={30} color={tintColor} />
        ),
        headerTitleStyle: {
            color: '#fff',
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
            <AccountMain navigation={navigation} />
        )
    }
}