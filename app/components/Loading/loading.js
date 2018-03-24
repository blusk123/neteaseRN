import React from 'react'
import { Image, View } from 'react-native'

export default ({size}) => {
    size = size ? size : 80
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../img/DoubleRing.gif')} style={{width: size, height: size}} />
        </View>
    )
}