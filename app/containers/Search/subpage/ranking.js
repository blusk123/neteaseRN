import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import TopListItem from '../../../components/Basic/toplistItem'
// import Loading from '../../../components/Loading/loading'
import { getTopList } from '../../../fetch/fetch'

export default class Ranking extends PureComponent {
    state = {
        data0: {},
        data1: {},
        data2: {},
        data3: {},
        data4: {},
        data5: {}
    }
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <View style={{
                borderBottomWidth: 3,
                borderColor: tintColor === '#000' ? 'rgba(0,0,0,0)' : tintColor,
                borderStyle: 'solid',
                justifyContent: 'center'
            }}>
                <Text style={{
                    color: tintColor,
                    fontSize:  tintColor === '#000' ? 14 : 15
                }}>排行榜</Text>
            </View>
        ),
    }
    componentDidMount() {
        this.getData0()
        this.getData1()
        this.getData2()
        this.getData3()
        this.getData4()
        this.getData5()
    }
    getData0 = async () => {
        const res = await getTopList({idx: '0'})
        this.setState({
            data0: res.playlist
        })
    }
    getData1 = async () => {
        const res = await getTopList({idx: '1'})
        this.setState({
            data1: res.playlist
        })
    }
    getData2 = async () => {
        const res = await getTopList({idx: '2'})
        this.setState({
            data2: res.playlist
        })
    }
    getData3 = async () => {
        const res = await getTopList({idx: '3'})
        this.setState({
            data3: res.playlist
        })
    }
    getData4 = async () => {
        const res = await getTopList({idx: '4'})
        this.setState({
            data4: res.playlist
        })
    }
    getData5 = async () => {
        const res = await getTopList({idx: '5'})
        this.setState({
            data5: res.playlist
        })
    }
    render() {
        const { data0, data1, data2, data3, data4, data5 } = this.state
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View>
                        <View style={{width: 140}}>
                            <View style={styles.titleCon}>
                                <Text style={styles.title}>
                                    云音乐官方榜
                                </Text>
                            </View>
                        </View>
                        { data0.tracks && <TopListItem data={data0}>
                            <ImageBackground style={styles.image} source={require('../../../img/top/0.jpg')} >
                                <Text style={styles.imageText}>每周更新</Text>
                            </ImageBackground>
                        </TopListItem>}
                        { data1.tracks && <TopListItem  data={data1}>
                            <ImageBackground style={styles.image} source={require('../../../img/top/1.jpg')} >
                                <Text style={styles.imageText}>每周更新</Text>
                            </ImageBackground>
                        </TopListItem>}
                        { data2.tracks && <TopListItem data={data2} >
                            <ImageBackground style={styles.image} source={require('../../../img/top/2.jpg')} >
                                <Text style={styles.imageText}>每周更新</Text>
                            </ImageBackground>
                        </TopListItem>}
                        { data3.tracks && <TopListItem data={data3} >
                            <ImageBackground style={styles.image} source={require('../../../img/top/3.jpg')} >
                                <Text style={styles.imageText}>每周更新</Text>
                            </ImageBackground>
                        </TopListItem>}
                        { data4.tracks && <TopListItem data={data4} >
                            <ImageBackground style={styles.image} source={require('../../../img/top/4.jpg')} >
                                <Text style={styles.imageText}>每周更新</Text>
                            </ImageBackground>
                        </TopListItem>}
                        { data5.tracks && <TopListItem data={data5} >
                            <ImageBackground style={styles.image} source={require('../../../img/top/5.jpg')} >
                                <Text style={styles.imageText}>每周更新</Text>
                            </ImageBackground>
                        </TopListItem>}
                    </View>
                </ScrollView> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '300',
        lineHeight: 18
    },
    titleCon: {
        borderLeftWidth: 4,
        borderColor: '#d43c33',
        borderStyle: 'solid',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 12,
    },
    image: {
        width: 130,
        height: 100,
        position: 'relative'
    },
    imageText: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        fontSize: 12,
        backgroundColor: 'transparent',
        color: '#fff'
    }
})