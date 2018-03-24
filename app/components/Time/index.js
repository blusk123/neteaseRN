import React from 'react'
import { Text,View } from 'react-native'

export default ({time, color}) => {
    time = time ? (time === true ? 0 : time) : 0
    let sec = Math.floor(time % 60)
    let min = Math.floor(time / 60)
    sec = sec > 9 ? sec : "0" + sec
    min = min > 9 ? min : '0' + min
    return (
        <View style={{width: 30}}>
            <Text style={{color: color ? color : '#fff', fontSize: 10}}>{min}:{sec}</Text>
        </View>
    )
}