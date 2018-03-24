import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from'react-native-vector-icons/Ionicons'


export default ({children, title, mes, click}) => (
    <TouchableOpacity onPress={click} style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    }}>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {children}
        </View>
        <View style={{
            flex: 18,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            borderColor: '#ddd'
        }}>
            <View style={{marginLeft: 10}}>
                <Text>{title}</Text>
            </View>
            <Icon size={21} style={{color: '#ddd'}} name="ios-arrow-forward-outline" />
        </View>
    </TouchableOpacity>
)