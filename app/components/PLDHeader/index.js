import React from 'react'
import { View, Text, Image, StyleSheet,ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({data, opacity}) => {
    const item = data
    const styles = StyleSheet.create({
        headerCon: {
            paddingHorizontal: 10, 
            paddingTop: 10,
            backgroundColor: '#eee',
            opacity: opacity
        },
        textCon: {
            marginLeft: 10,
            width: '70%',
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
        },
        img: {
            width: 24,
            height: 24,
            borderRadius: 12
        },
        bottomView: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    })
    return (
        <ImageBackground resizeMode="stretch" style={styles.headerCon} source={{uri: item.coverImgUrl + '?param=2y2'}}>
            <View style={{flexDirection: 'row', height: 120}}>
                <Image style={{width: '35%'}} source={{uri: item.coverImgUrl + '?param=240y240'}} />
                <View style={styles.textCon}>
                    <View style={{backgroundColor: 'transparent', width: '84%'}}>
                        <Text style={{color: '#fff',fontSize: 16}}>{item.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row',backgroundColor: 'transparent', alignItems: 'center' }}>
                        <Image style={styles.img} source={{uri: item.creator.avatarUrl}} />
                        <View style={{paddingHorizontal: 5}}>
                            <Text style={{color: '#fff'}}>{item.creator.nickname}</Text>
                        </View>
                        <Icon style={{color: '#fff'}} name="ios-arrow-forward-outline"/>
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection: 'row', 
                backgroundColor: 'transparent',
                justifyContent: 'space-around',
                marginTop: 20,
                marginBottom: 15
                }}>
                <View style={styles.bottomView}>
                    <Icon size={24} style={{color: '#fff'}} name="ios-folder-open-outline" />
                    <Text style={{color: '#fff'}}>{item.subscribedCount}</Text>
                </View>
                <View style={styles.bottomView}>
                    <Icon size={24} style={{color: '#fff'}} name="ios-paper-outline" />
                    <Text style={{color: '#fff'}}>{item.commentCount}</Text>

                </View>
                <View style={styles.bottomView}>
                    <Icon size={24} style={{color: '#fff'}} name="ios-git-branch-outline" />
                    <Text style={{color: '#fff'}}>{item.shareCount}</Text>
                </View>
                <View style={styles.bottomView}>
                    <Icon size={24} style={{color: '#fff'}} name="ios-download-outline" />
                    <Text style={{color: '#fff'}}>下载</Text>
                </View>
            </View>
        </ImageBackground>
    )
}
