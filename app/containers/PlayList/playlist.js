import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import HeaderBac from '../../components/Basic/headerbac'

export default class PlayList extends PureComponent {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    render() {
        const { navigation } = this.props
        return (
            <View>
                <HeaderBac navigation={navigation} title="歌单" />
                <Text>这是歌单页</Text>
            </View>
        )
    }
}