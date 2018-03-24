import React from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const countFn = (count) => {
    const i = count > 100000 ? (Math.floor(count/10000) + '万') : Math.floor(count)
    return i
}

export default ({item, h, navigation, type}) => {
    const styles = StyleSheet.create({
        view: {
            height: h,
            position: 'relative',
            marginBottom: 5,
            backgroundColor: '#ccc'
        },
        text: {
            fontWeight: '300',
            fontSize: 12
        },
        art: {
            color: '#777',
            fontSize: 11,
            fontWeight: '300',
            marginTop: 3
        },
        v_text_con: {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '50%'
        },
        v_text: {
            position: 'absolute',
            top: 0,
            right: 0,
            textAlign: 'right',
            backgroundColor: 'transparent',
            fontSize: 12,
            color: '#fff'
        }
    })
    //设置动画控制 图片淡入
    const fadein = new Animated.Value(0)
    item.picUrl && Animated.timing(
        fadein,
        {
          toValue: 1,
          duration: 1000
        }
      ).start()
    const toOther = () => {
        switch(type) {
            case '1':
                navigation.navigate('PlayListDetail',{id: item.id})
                break
        }
    }
    return (
    <TouchableOpacity onPress={toOther} style={{flex: 1}}>
        <View style={styles.view}>
            <Animated.Image style={{flex: 1, opacity: fadein}} resizeMode='stretch' source={{uri: item.picUrl + '?param=180y180'}} />
            { item.playCount && 
                <LinearGradient style={styles.v_text_con} colors={['rgba(0,0,0,.5)', 'rgba(0,0,0,0)']} >
                    <Text style={styles.v_text}>{countFn(item.playCount)}</Text>
                </LinearGradient>
            }
        </View>
        <View style={{marginBottom: 5}}>
            <Text style={styles.text}>
                {item.name.length > 20 ? item.name.slice(0,20) : (item.name) + '...'}
            </Text>
            { item.artistName && <Text style={styles.art}>{item.artistName}</Text>}
        </View>
    </TouchableOpacity>
    )
}