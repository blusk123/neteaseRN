import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/playlisth'
import * as plActionCreators from '../../../actions/playlist'

import Loading from '../../../components/Loading/loading'
import SongHeader from '../../../components/SongHeader/index'
import PlayList from '../../../components/PlayList/index'

class Song extends PureComponent {
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
                }}>歌单</Text>
            </View>
        ),
    }
    getPlayListHFn = () => {
        const item = {limit: 1}
        this.props.fetchList.getPlayLH(item)
    }
    getPlayListFn = async () => {
        await this.getPlayListHFn()
        const item = { limit: 50 }
        this.props.fetchpl.getPlayL(item)
    }
    componentDidMount() {
        // this.getPlayListHFn()
        this.getPlayListFn()
    }
    renderHeader = () => {
        const {playlisth, mainnav} = this.props
        return (
            <View style={{height: 196}}>
                {playlisth.data.playlists && 
                    <View>
                        <SongHeader mainnav={mainnav.navigation} data={playlisth.data.playlists}/>
                        <View style={styles.filter}>
                            <TouchableOpacity style={styles.left}>
                                <Text style={{fontWeight: '200'}}>全部歌单</Text>
                                <View style={{marginLeft: 5}}>
                                    <Icon size={14} name="ios-arrow-forward-outline" />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.right}>
                                <TouchableOpacity style={{paddingRight: 5}}>
                                    <Text style={styles.right_text}>欧美</Text>
                                </TouchableOpacity>
                                <Text style={{fontWeight: '200'}}>|</Text>
                                <TouchableOpacity style={styles.border}>
                                    <Text style={styles.right_text}>电子</Text>
                                </TouchableOpacity>
                                <Text style={{fontWeight: '200'}}>|</Text>
                                <TouchableOpacity style={{paddingLeft: 5}}>
                                    <Text style={styles.right_text}>摇滚</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }                   
            </View>
        )
    }
    renderItem = ({item}) => {
        const { mainnav } = this.props
        return (<View style={{flex: 1}}>
            {
                item.isFetching ? 
                <Loading /> :
                <View>
                    <PlayList navigation={mainnav.navigation} data={item.data}/>
                </View>  
            }
        </View>)
    }
    render() {
        const { playlist } = this.props
        return (
            <View style={{flex: 1}}>
                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    data={[
                        {key:1, isFetching: playlist.isFetching, data: playlist.data.playlists }
                    ]}
                    renderItem={this.renderItem}
                    /> 
            </View>
        )
    }
}
function mapStateToProps(state) {
    const { playlisth, mainnav, playlist } = state
    return {
        playlisth,
        mainnav,
        playlist
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchList: bindActionCreators(actionCreators, dispatch),
        fetchpl: bindActionCreators(plActionCreators, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Song)

const styles = StyleSheet.create({
    filter: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    left: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        width: 90,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right_text: {
        fontSize: 13,
        fontWeight: '200'
    },
    border: {
        // borderRightWidth: 1,
        // borderStyle: 'solid',
        // borderColor: '#aaa',
        // borderLeftWidth: 1,
        paddingHorizontal: 5
    }
})