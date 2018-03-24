import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Animated, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const headerIcon = {
    backgroundColor: "transparent",
    underlayColor: "transparent",
    activeOpacity: 0.8,
    size: 36
}

export default ({navigation, title, img, name, opacity, reset}) => {
    const styles = StyleSheet.create({
        viewCon: {
            height: 68,
            paddingTop: 20,
            flexDirection: 'row',
            alignItems: 'center', 
            zIndex: 100,
            backgroundColor: img ? "transparent" : '#d43c33',
        }
    })
    const toBack =()=> {
        navigation.goBack()
        reset && reset()
    }
    const gun1 = new Animated.Value(0)
    const l = name && (name.length)*16 + 50
    const animate = () => {
        Animated.timing(
            gun1,
            {
              toValue: -l,
              duration: (10000/12)*name.length,
              loop: true,
              easing: Easing.linear
            }
        ).start((e) => {
            if(e.finished){
                gun1.setValue(0)
                animate()
            }
        })
    }
    name && animate()
    let data = [name,name]
    //匹配 歌单详情头部
    const renderitem = img && !opacity ?         
        <ImageBackground source={{uri: img + '?param=2y2'}} style={styles.viewCon}>
            <Icon.Button onPress={toBack} {...headerIcon} style={{marginLeft: 10}} name="ios-arrow-round-back-outline" />
            <Text style={{fontSize: 16, color: '#fff'}}>{title}</Text>
            {
                name && <View style={{marginLeft: 10,
                 width: 200,
                 overflow: 'hidden'}}>
                <Animated.View style={{
                    position: 'relative',
                    left: gun1,
                    zIndex: -10,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        position: 'relative',
                        width: l,
                        fontSize: 16, 
                        color: '#fff'}}>{data[0]}</Text>
                    <Text style={{
                        fontSize: 16,
                        position: 'relative',
                        width: l, 
                        color: '#fff',}}>{data[1]}</Text>
                </Animated.View>
            </View>}
        </ImageBackground>
        : 
        //匹配 一般页面头部以及 播放页面头部
        <View style={styles.viewCon}>
            <Icon.Button onPress={() => toBack(navigation)} {...headerIcon} style={{marginLeft: 10}} name="ios-arrow-round-back-outline" />
            <Text style={{fontSize: 16, color: '#fff'}}>{title}</Text>
        </View>
    return renderitem
}