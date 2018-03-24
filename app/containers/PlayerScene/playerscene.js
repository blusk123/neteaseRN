import React, { PureComponent } from 'react'
import Slider from 'react-native-slider'
import { View, ScrollView, Text, ImageBackground, Animated, Image, StyleSheet, Easing, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'

import { getMusicUrl, getLyric } from '../../fetch/fetch'
import HeaderBac from '../../components/Basic/headerbac'
import Time from '../../components/Time/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sliderActionCreators from '../../actions/slider'
import * as indexActionCreators from '../../actions/mc_index'

class Player extends PureComponent {
    state = {
        val: false,
        value: 0,
        showLyic: false,
        lrcArr: [],
        itemArr: [],
        currentIndex: 0
    }
    imageRotate = new Animated.Value(0)
    needleRotate = new Animated.Value(0)

    static navigationOptions = ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
    })
    getMusicLyric = (id) => {
        getLyric({ id }).then(res => {
            let lrc
            let tlrc
            if(res.lrc) {
                lrc = res.lrc.lyric.split(/\n/)
                tlrc = res.tlyric.lyric && res.tlyric.lyric.split(/\n/)
                this.LyricFn(lrc)
            }else if(res.nolyric) {
                this.setState({
                    lrcArr: [{txt: '纯音乐，请欣赏', total: 1}]
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    LyricFn = (lrc) => {
        console.log(lrc)
        const lrcArr = []
        lrc.map((val, index) => {
            let obj = {}
            val = val.replace(/(^\s*)|(\s*$)/g, '') 
            let indeofLastTime = val.indexOf(']')
            let timeStr = val.substring(1, indeofLastTime)
            let minSec = ''
            let timeMsIndex = timeStr.indexOf('.')  // .的下标
            let timeMiIndex = timeStr.indexOf(':')
            if (timeMsIndex !== -1) {
                //存在毫秒 0:04.19
                minSec = timeStr.substring(1, val.indexOf('.'))  // 0:04.
                obj.ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))  //毫秒值 19
            } else if(timeMiIndex !== -1) {
                //不存在毫秒 0:04
                minSec = timeStr
                obj.ms = 0
            } else {
                minSec = ''
            }
            if(minSec !== "") {
                let curTime = minSec.split(':')  // [0,04]
                obj.min = parseInt(curTime[0])   //分钟 0
                obj.sec = parseInt(curTime[1])   //秒钟 04
                obj.txt = val.substring(indeofLastTime + 1, val.length) //歌词文本: 留下唇印的嘴
                obj.txt = obj.txt.replace(/(^\s*)|(\s*$)/g, '')
                obj.dis = false
                let i 
                if(obj.ms.length === 1) {
                    i = obj.ms / 10
                }else if (obj.min.length === 2) {
                    i = obj.ms / 100
                }else {
                    i = obj.ms / 1000
                }
                obj.total = obj.min * 60 + obj.sec + i
            }
            lrcArr.push(obj)
        })
        this.setState({
            lrcArr: lrcArr
        })
    }
    componentDidMount() {
        const { play } = this.props.slider
        const { mcindex, songs } = this.props
        play && this.rotateStart()
        this.getMusicLyric(songs[mcindex].id)
        // console.log(songs[mcindex])
    }
    componentWillReceiveProps(newprops) {
        const oldplay = this.props.slider.play
        const currentTime = this.props.slider.currentTime
        const nextCurrentTime = newprops.slider.currentTime
        const { lrcArr } = this.state
        const newplay = newprops.slider.play
        const oldindex = this.props.mcindex
        const newindex = newprops.mcindex
        if (oldplay !== newplay) {
            if (newplay) {
                this.rotateStart()
            } else {
                this.rotateEnd()
            }
        }
        if (newindex !== oldindex) {
            this.setState({
                lrcArr: [],
                currentIndex: 0
            })
            this.getMusicLyric(newprops.songs[newindex].id)
        }
        if(nextCurrentTime !== currentTime) {
            let indexArr = []
            lrcArr.filter((item,index) => {
                if(item.total < currentTime) {
                    indexArr.push(index)
                }
            })
            // console.log(indexArr)
            this.setState({
                currentIndex: indexArr.length - 1
            })
            indexArr.length && this.scrollView.scrollTo({x: 0, y: 30 * indexArr.length, animated: true})
        } 
    }
    rotateStart = () => {
        const { value } = this.state
        this.animate(value)
    }
    rotateEnd = () => {
        this.imageRotate.stopAnimation(e => this.setState({
            value: e
        }))
    }
    needleStart = () => {
        Animated.timing(
            this.needleRotate,
            {
                toValue: 1,
                duration: 400
            }
        ).start()
    }
    needleEnd = () => {
        Animated.timing(
            this.needleRotate,
            {
                toValue: 0,
                duration: 400
            }
        ).start()
    }
    needleAll = () => {
        Animated.timing(
            this.needleRotate,
            {
                toValue: 1,
                duration: 400
            }
        ).start(e => {
            if (e.finished) {
                this.needleEnd()
            }
        })
    }
    animate = (value) => {
        Animated.timing(
            this.imageRotate,
            {
                toValue: 1,
                duration: (1 - value) * 30000,
                easing: Easing.linear
            }
        ).start((e) => {
            if (e.finished) {
                this.imageRotate.setValue(0)
                this.animate(0)
            }
        })
    }
    clickPlay = () => {
        const { play } = this.props.slider
        const newplay = !play
        if (newplay) {
            this.rotateStart()
            this.needleEnd()
        } else {
            this.rotateEnd()
            this.needleStart()
        }
        this.props.update.update({ play: newplay })
    }
    changePlay = (title) => {
        const { mcindex, songs } = this.props
        let index
        title === 'back' ?
            index = mcindex == 0 ? songs.length - 1 : mcindex - 1
            :
            index = mcindex == (songs.length - 1) ? 0 : mcindex + 1
        this.props.updateIndex.update(index)
        this.props.update.update({ play: false, currentTime: 0 })
        this.imageRotate.setValue(0)
        this.needleAll()
    }
    sliderChange = (value) => {
        this.props.update.update({ currentTime: value })
    }
    // reset = () => {
    //     this.props.reset.update({reset: true})
    // }
    sliderCom = (value) => {
        this.props.update.update({ sliderDone: value })
    }
    scroll = (e) => {
        const x = e.nativeEvent.contentOffset.x
        const { mcindex, songs } = this.props
        let index
        if (x > 80) {
            index = mcindex == 0 ? songs.length - 1 : mcindex - 1
        } else if (x < -80) {
            index = mcindex == (songs.length - 1) ? 0 : mcindex + 1
        } else {
            index = mcindex
        }
        if (index !== mcindex) {
            this.props.updateIndex.update(index)
            this.props.update.update({ play: false })
            this.imageRotate.setValue(0)
        }
    }
    showLyic = () => {
        const show = this.state.showLyic
        this.setState({
            showLyic: !show
        })
    }
    render() {
        const { songs, slider, navigation, mcindex } = this.props
        const { showLyic, lrcArr, currentIndex } = this.state
        const pic = songs[mcindex].pic
        const play = slider.play
        const iconStyle = play ? 'ios-pause-outline' : 'ios-play-outline'
        const spin = this.imageRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        const needle = this.needleRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['-5deg', '-33deg']
        })
        return (
            <ImageBackground source={{ uri: pic + '?param=3y2' }} style={{ flex: 1 }}>
                <HeaderBac opacity={true} img={pic} navigation={navigation} />
                <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{ height: 1 }} colors={[
                        'rgba(255,255,255,0)',
                        'rgba(255,255,255,.6)',
                        'rgba(255,255,255,0)'
                    ]} />
                <TouchableOpacity style={styles.albumCon} onPress={this.showLyic}>
                    <ScrollView 
                        ref={scrollView => this.scrollView = scrollView}
                        contentContainerStyle={{
                            alignItems: 'center',
                            // justifyContent: 'center',
                            paddingTop: 250,
                            paddingHorizontal: 30,
                        }}
                        style={{
                            flex: 1,
                            position: 'absolute',
                            top: 10,
                            height: 500,
                            backgroundColor: 'transparent',
                            opacity: showLyic ? 1 : 0
                        }}>
                        {
                            lrcArr.length ? (lrcArr.map((item,index) => (<View style={{
                                    height: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} key={index}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: index === currentIndex ? '#fff' : '#ccc', 
                                    }}>{item.txt}</Text>
                            </View>))) : <Text style={{color: '#fff'}}>歌词加载中...</Text>
                        }
                    </ScrollView>
                    <View style={{
                        alignItems: 'center',
                        flex: 1,
                        opacity: showLyic ? 0 : 1
                    }}>
                        <Animated.View style={{
                            width: 160,
                            height: 240,
                            position: 'absolute',
                            top: -120,
                            paddingTop: 120,
                            paddingLeft: 75,
                            left: 100,
                            zIndex: 10,
                            transform: [{ rotate: needle }]
                        }}>
                            <Image
                                style={{ height: 120, width: 80, }}
                                source={require('../../img/needle.png')} />
                        </Animated.View>
                        <View style={{
                            width: 300,
                            height: 300,
                            position: 'absolute',
                            top: 50,
                            backgroundColor: 'rgba(255,255,255,.2)',
                            borderRadius: 150
                        }}></View>
                        <ScrollView
                            onScroll={this.scroll}
                            scrollEventThrottle={100}
                            horizontal={true}
                            style={{ flex: 1 }}>
                            <View style={{
                                width: 375,
                                paddingHorizontal: 37.5
                            }}>
                                <ImageBackground style={styles.discBac} source={require('../../img/disc.png')}>
                                    <Animated.Image
                                        style={{
                                            width: 200,
                                            height: 200,
                                            borderRadius: 100,
                                            transform: [{ rotate: spin }]
                                        }}
                                        source={{ uri: pic }} />
                                </ImageBackground>
                            </View>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
                <View style={styles.bottomCon}>
                    <View style={styles.icon}>
                        <Icon size={24} style={{ color: '#fff', fontWeight: '500' }} name="ios-heart-outline" />
                        <Icon size={24} style={{ color: '#fff', fontWeight: '500' }} name="ios-download-outline" />
                        <Icon size={24} style={{ color: '#fff', fontWeight: '500' }} name="ios-paper-outline" />
                        <Icon size={24} style={{ color: '#fff', fontWeight: '500' }} name="md-more" />
                    </View>
                    <View style={styles.slider}>
                        <Time time={slider.currentTime} />
                        <Slider
                            style={{ flex: 1, marginLeft: 5, marginRight: 5 }}
                            trackStyle={{ height: 2 }}
                            thumbStyle={styles.thumb}
                            value={slider.currentTime}
                            maximumValue={slider.allTime}
                            onSlidingComplete={this.sliderCom}
                            onValueChange={this.sliderChange}
                            minimumTrackTintColor='#d43c33' />
                        <Time time={slider.allTime} color="rgba(255,255,255,.6)" />
                    </View>
                    <View style={styles.control}>
                        <Icon size={28} style={{ color: 'rgba(255,255,255,.5)' }} name="ios-swap-outline" />
                        <TouchableOpacity onPress={() => this.changePlay('back')}>
                            <Icon size={28} style={{ color: '#fff' }} name="ios-skip-backward-outline" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.clickPlay}>
                            <Icon size={42} style={{ color: '#fff' }} name={iconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changePlay('next')}>
                            <Icon size={28} style={{ color: '#fff' }} name="ios-skip-forward-outline" />
                        </TouchableOpacity>
                        <Icon size={28} style={{ color: 'rgba(255,255,255,.5)' }} name="ios-list-outline" />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    albumCon: {
        position: 'relative',
        alignItems: 'center',
        zIndex: 1,
        overflow: 'hidden',
        flex: 1,
        marginBottom: 150
    },
    discBac: {
        width: 300,
        height: 300,
        marginVertical: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomCon: {
        position: 'absolute',
        height: 150,
        bottom: 0,
        right: 0,
        left: 0,
        padding: 20,
        flex: 1,
        zIndex: 100,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    icon: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    slider: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    thumb: {
        width: 16,
        height: 16,
        backgroundColor: '#d43c33',
        borderColor: '#fff',
        borderWidth: 6,
        borderRadius: 8,
    },
    control: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

function mapStateToProps(state) {
    const { songs, mcindex, slider } = state
    return {
        songs,
        mcindex,
        slider
    }
}
function mapDispatchToProps(dispatch) {
    return {
        update: bindActionCreators(sliderActionCreators, dispatch),
        updateIndex: bindActionCreators(indexActionCreators, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)