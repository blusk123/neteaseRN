import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { getUserDetail } from '../../fetch/fetch'

import AccountItem from '../../components/Basic/accountItem'
import Toast from '../../components/Toast/index'

export default class AccountMain extends PureComponent {
    state = {
        userdetail: {},
        value: 0
    }
    pressHandle = () => {
        storage.remove({
            key: 'loginState'
        })
        this.props.navigation.navigate('Login')
    }
    getUserDetail = (item) => {
        getUserDetail(item).then(res => {
            this.setState({
                userdetail: res
            })
        })
    }
    componentDidMount() {
        storage.load({
            key: 'loginState'
        }).then(res => {
            this.getUserDetail({uid: res.id})
        }).catch(err => {
            console.log(err)
        })
    }
    clickHandle = () => {
        const i = Math.random()
        this.setState({
            value: i
        })
    }
    render() {
        const { userdetail, value } = this.state
        console.log(userdetail)
        return (
            <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <View style={{backgroundColor: '#fff'}}>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <ImageBackground style={{
                                width: 56, 
                                height: 56,
                                borderRadius: 28,
                                padding: 5,
                                backgroundColor: '#ddd',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16
                            }}>上传头像</Text>
                            </ImageBackground>
                            <View style={{marginLeft: 10}}>
                                { userdetail.profile && <Text>{userdetail.profile.nickname}</Text>}
                                <Text style={{fontSize: 12, color: '#777'}}>Lv{userdetail.level}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{
                            width: 60,
                            height: 24,
                            borderRadius: 12,
                            borderColor: '#d43c33',
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{color: '#d43c33', fontSize: 12}}>签到</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        borderColor: '#ccc',
                        borderTopWidth: 0.5
                    }}>
                        <View style={styles.headeritem}>
                            <Text style={{fontSize: 12,color: '#777'}}>动态</Text>
                            { userdetail.profile && <Text>{userdetail.profile.eventCount}</Text> }
                        </View>
                        <View style={styles.headeritem}>
                            <Text style={{fontSize: 12,color: '#777'}}>关注</Text>
                            { userdetail.profile && <Text>{userdetail.profile.followeds}</Text>}
                        </View>
                        <View style={styles.headeritem}>
                            <Text style={{fontSize: 12,color: '#777'}}>粉丝</Text>
                            { userdetail.profile && <Text>{userdetail.profile.follows}</Text>}
                        </View>
                        <View style={styles.headeritem}>
                            <Text style={{fontSize: 12,color: '#777'}}>我的资料</Text>
                            <Icon size={16} name="ios-brush-outline" />
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 10, backgroundColor: '#fff'}}>
                    <AccountItem click={this.clickHandle} title="我的消息">
                        <Icon size={21} style={{color: '#555'}} name="ios-mail-outline" />
                    </AccountItem>
                </View>
                <View style={{marginTop: 10, backgroundColor: '#fff'}}>
                    <AccountItem click={this.clickHandle} title="VIP会员">
                        <Icon size={21} style={{color: '#555'}} name="ios-musical-note-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="商城">
                        <Icon size={21} style={{color: '#555'}} name="ios-cart-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="在线免费听歌">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                </View>
                <View style={{marginTop: 10, backgroundColor: '#fff'}}>
                    <AccountItem click={this.clickHandle} title="设置">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="扫一扫">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="个性换肤">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="夜间模式">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="定时关闭">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="音乐闹钟">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="驾驶模式">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                </View>
                <View style={{marginTop: 10, backgroundColor: '#fff'}}>
                    <AccountItem click={this.clickHandle} title="关于网易云音乐">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                    <AccountItem click={this.clickHandle} title="关于">
                        <Icon size={21} style={{color: '#555'}} name="ios-filing-outline" />
                    </AccountItem>
                </View>
                <TouchableOpacity
                    style={{
                        padding: 15,
                        alignItems: 'center',
                        marginVertical: 10,
                        backgroundColor: '#fff'
                    }}
                    onPress={this.pressHandle}>
                    <Text style={{color: '#d43c33', fontSize: 15}}>退出登录</Text>
                </TouchableOpacity>
            </ScrollView>
            <Toast value={value} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headeritem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRightWidth: 0.5,
        borderColor: '#ccc'
    }
})