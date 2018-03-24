import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import HeaderBac from '../../components/Basic/headerbac'

export default class Movie extends PureComponent {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    render() {
        const { navigation } = this.props
        return (
            <View>
                <HeaderBac title="MV" navigation={navigation} />
                <Text>这是MV页</Text>
            </View>
        )
    }
}