import React, { PureComponent } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import HeaderBac from '../../components/Basic/headerbac'

export default class Music extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
    })
    render() {
        const { navigation } = this.props
        return (
            <View>
                <HeaderBac navigation={navigation}  title="视频放送"/>
                <Text>这是视频页</Text>
            </View>
        )
    }
}