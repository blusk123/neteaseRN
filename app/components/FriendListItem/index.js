import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

export default ({data, update, navigation, index}) => {
    const mc = JSON.parse(data.json)
    // console.log(mc)
    const name = data.user.nickname
    const date = new Date(data.showTime)
    const time = (date.getMonth() + 1) + '月' + date.getDate() + '日'
    const toPlayerScene = () => {
        update(index)
        navigation.navigate('PlayerScene')
    }
    return (
        <TouchableOpacity style={styles.touchCon}>
            <Image style={styles.leftImg} 
                source={{uri: data.user.avatarUrl + '?param=80y80'}} />
            <View style={styles.rightV}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#5ab5e7',marginRight: 5}}>{name}</Text>
                            <Text>分享单曲:</Text>
                        </View>
                        <Text style={{color: '#aaa', fontSize: 12, marginTop:5}}>{time}</Text>
                    </View>
                    <TouchableOpacity style={{
                        width: 50,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#d43c33'
                    }}>
                        <Text style={{color: '#fff',fontSize: 12, backgroundColor: 'transparent'}}>+关注</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 10}}>
                    <Text>{mc.msg}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                }}>
                    {
                        data.pics.map((item, index) => 
                            <Image key={data.id + index} style={{width: '49.7%', height: 140}} source={{uri: item.pcSquareUrl}}/>
                        )
                    }
                </View>
                <TouchableOpacity
                    onPress={toPlayerScene}
                    style={{
                        backgroundColor: '#ddd',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5
                    }}>
                    <ImageBackground style={{width: 32,height: 32, justifyContent: 'center', alignItems: 'center'}} source={{uri: mc.song.album.picUrl + '?param=80y80'}} >
                        <Icon style={{
                            backgroundColor: 'transparent',
                            color: 'rgba(255,255,255,.8)'
                        }} size={24} name="md-arrow-dropright-circle" /> 
                    </ImageBackground>
                    <View style={{marginLeft: 5}}>
                        <Text>{mc.song.name}</Text>
                        <Text style={{color: '#666', fontSize: 12}}>{mc.song.artists[0].name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{marginVertical: 10}}>
                    <Text style={{color: '#999', fontSize: 12}}>——{data.rcmdInfo.reason}</Text>
                </View>
                <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 5,
                        justifyContent: 'space-between' ,
                    }}>
                        <View style={styles.comment}>
                            <Icon style={{marginRight: 5}} size={18} name="ios-thumbs-up-outline" />
                            <Text style={{color: '#777', fontSize: 12}}>{data.info.likedCount}</Text>
                        </View>
                        <View style={styles.comment}>
                            <Icon style={{marginRight: 5}} size={18} name="ios-chatboxes-outline" />
                            <Text style={{color: '#777', fontSize: 12}}>{data.info.commentCount}</Text>
                        </View>
                        <View style={styles.comment}>
                            <Icon style={{marginRight: 5}} size={18} name="ios-git-branch-outline" />
                            <Text style={{color: '#777', fontSize: 12}}>{data.info.shareCount}</Text>
                        </View>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end', paddingRight: 10}}>
                        <Icon size={18} style={{color: '#999'}} name="md-more" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    touchCon: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    leftImg: {
        width: 32,
        height: 32,
        marginRight: 10,
        borderRadius: 16
    },
    rightV: {
        flex: 9
    },
    comment: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})