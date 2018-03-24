import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default ({children, data}) => {
    const items = data.tracks
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5
        }}>
            {children}
            <View style={{height: 100, paddingVertical: 10, marginLeft: 10, justifyContent: 'space-around'}}>
                <Text>1. {items[0].name}</Text>
                <Text>2. {items[1].name}</Text>
                <Text>3. {items[2].name}</Text>
            </View>
        </TouchableOpacity>
    )
}