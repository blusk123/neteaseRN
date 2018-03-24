import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SectionList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/userplaylist'

import { getUserInfo } from '../../fetch/fetch'
import UserPlayList from '../../components/UserPlayList/index'
import Loading from '../../components/Loading/loading'

class MyMusicMain extends PureComponent {
    state = {
        userInfo: {}
    }
    getUserPLFn = () => {
        // const { uid } = this.props
        // console.log(uid)
        storage.load({
            key: 'loginState'
        }).then(res => {
            this.props.fetchUserPL.getUserPL({uid: res.id})
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        getUserInfo().then(res => {
            if(res.code === 200) {
                this.setState({
                    userInfo: res
                })
            }
        })
        this.getUserPLFn()
    }
    renderHeader = () => {
        const { userInfo } = this.state
        return (
            <View>
                <TouchableOpacity style={styles.topitem}>
                    <View style={styles.leftIcon}>
                        <Icon style={{color: '#d43c33'}} name="ios-musical-notes-outline" size={24} />
                    </View>
                    <View style={styles.viewCon}>
                        <Text>
                            本地音乐
                            <Text>(0)</Text>
                        </Text>
                        <Icon name="ios-arrow-forward-outline" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topitem}>
                    <View style={styles.leftIcon}>
                        <Icon style={{color: '#d43c33'}} name="ios-time-outline" size={24} />
                    </View>
                    <View style={styles.viewCon}>
                        <Text>
                            最近播放
                            <Text>(100)</Text>
                        </Text>
                        <Icon name="ios-arrow-forward-outline" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topitem}>
                    <View style={styles.leftIcon}>
                        <Icon style={{color: '#d43c33'}} name="ios-download-outline" size={24} />
                    </View>
                    <View style={styles.viewCon}>
                        <Text>
                            下载管理
                            <Text>(0)</Text>
                        </Text>
                        <Icon name="ios-arrow-forward-outline" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topitem}>
                    <View style={styles.leftIcon}>
                        <Icon style={{color: '#d43c33'}} name="ios-contact-outline" size={24} />
                    </View>
                    <View style={styles.viewCon}>
                        <Text>
                            我的电台
                            <Text>({userInfo.djRadioCount})</Text>
                        </Text>
                        <Icon name="ios-arrow-forward-outline" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topitem}>
                    <View style={styles.leftIcon}>
                        <Icon style={{color: '#d43c33'}} name="ios-finger-print-outline" size={24} />
                    </View>
                    <View style={styles.viewCon}>
                        <Text>
                            我的收藏
                            <Text>({userInfo.artistCount})</Text>
                        </Text>
                        <Icon name="ios-arrow-forward-outline" />
                    </View>
                </TouchableOpacity>
            </View> 
        )
    }
    renderItem = ({item}) => {
        const { navigation } = this.props
        const renderitem = item.data ?
        <UserPlayList title={item.title} navigation={navigation} data={item.data}/>
        : <Loading size={60} />

        return renderitem
    }
    render() {
        const { userpl } = this.props
        return (
            <View style={{flex: 1}}>

                <SectionList
                    // style={{flex: 1}} 
                    renderItem={this.renderItem}
                    sections={[
                        { 
                            key: 'mm1', 
                            data:[{
                                key: 1, 
                                title: '创建的歌单(12)',
                                data: userpl.data.playlist
                            }]
                    }]}
                    ListHeaderComponent={this.renderHeader} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topitem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingVertical: 20,
        flex: 1
    },
    viewCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingRight: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        flex: 7
    },
    leftIcon: {
        flex: 1,
        alignItems: 'center'
    }
})

function mapStateToProps(state) {
    const { uid, userpl } = state
    return {
        uid,
        userpl
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchUserPL: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyMusicMain)