import React from 'react'
import { View, Text, Image, StyleSheet,ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({data, mainnav}) => {
    const toPlayList = () => {
        mainnav.navigate('PlayList')
    }
    const item = data[0]
    return (
        <ImageBackground resizeMode="cover" style={styles.headerCon} source={{uri: item.coverImgUrl + '?param=2y2'}}>
                <Image style={{width: '35%'}} source={{uri: item.coverImgUrl + '?param=240y240'}} />
                <View style={styles.textCon}>
                    <View style={styles.text}>
                        <Icon size={20} style={styles.icon} name="ios-ribbon-outline" color='#ff9d02' />
                            <TouchableOpacity 
                                style={{
                                flex: 1, flexDirection: 'row', 
                                marginLeft: 5, justifyContent: 'space-between'
                                }}
                                onPress={toPlayList}>
                                <Text style={{color: '#fff',fontSize: 16}}>精品歌单</Text>
                                <Icon color="#ccc" size={16} name="ios-arrow-forward-outline" />
                            </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor: 'transparent'}}>
                        <Text style={{color: '#fff', marginBottom: 5}}>{item.name}</Text>
                        <Text style={{color: '#ccc', fontSize: 12}}>{item.copywriter}</Text>
                    </View>
                </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    headerCon: {
        height: 140,
        paddingHorizontal: 10, 
        paddingVertical: 20,
        backgroundColor: '#eee',
        flexDirection: 'row'
    },
    textCon: {
        marginLeft: 10,
        justifyContent: 'space-around'
    },
    text: {
        backgroundColor: 'transparent',
        width: '41%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ff9d02',
        width: 24,
        height: 24,
        lineHeight: 24,
        borderRadius: 12,
        textAlign: 'center',
        // backgroundColor: '#rgba(255,157,2,.4)'
    }
})
