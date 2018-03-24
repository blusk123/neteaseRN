import React, { PureComponent }  from 'react' 
import { View, Text, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/playlistd'
import * as idActionCreators from '../../actions/mc_index'
import * as songsActionCreators from '../../actions/songs'

import Loading from '../../components/Loading/loading'
import PLDHeader from '../../components/PLDHeader/index'
import SongList from '../../components/Basic/songItem'
import HeaderBac from '../../components/Basic/headerbac'

class PlayListDetail extends PureComponent {
    state ={
        opacity: 1,
        y:0
    }
    static navigationOptions = ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
    })
    getDetailFn = (item) => {
        this.props.fetchDetail.getPlayLD(item)
    }
    componentDidMount() {
        const id = this.props.navigation.state.params.id
        this.getDetailFn({id})
    }
    componentWillReceiveProps(newprops) {
        const { data, isFetching } = newprops.playlistd
        if(!isFetching) {
            const datas  = data.result && data.result.tracks
            const songArr = []
            datas && datas.map(item => {
                songArr.push({id:item.id, pic: item.album.picUrl})
            })
            this.props.change.changeSongs(songArr)
        }
    }
    componentWillUnmount() {
        this.props.fetchDetail.reset()
    }
    updateId = (index) => {
        this.props.update.update(index)
    }
    scroll = (e) => {
        let y = e.nativeEvent.contentOffset.y
        y = y > 180 ? 181 : y
        this.setState({y})
    }
    render() {
        const { playlistd, navigation } = this.props
        const { opacity, y } = this.state
        return (
            <View style={{flex: 1}}>
                {
                    playlistd.data.result && <HeaderBac title='歌单' 
                        img={playlistd.data.result.coverImgUrl} 
                        name={ y > 180 && playlistd.data.result.name}
                        navigation={navigation} />
                }
                {
                    playlistd.data.result ? 
                    <ScrollView 
                        onScroll={this.scroll}
                        style={{flex: 1}}
                        scrollEventThrottle={100}>
                        <PLDHeader opacity={opacity} data={playlistd.data.result}/>
                        <View style={{flex: 1}}>
                            {
                                playlistd.data.result.tracks.map((item, index) => {
                                    return <SongList 
                                        updateId={this.updateId}
                                        navigation={navigation} 
                                        data={item}
                                        key={index} 
                                        index={index} />
                                })
                            }
                        </View>
                    </ScrollView> :
                    <Loading />
                }
            </View>
        )
    }
}
function mapStateToProps(state) {
    const { playlistd, mcindex } = state
    return {
        playlistd,
        mcindex
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchDetail: bindActionCreators(actionCreators, dispatch),
        update: bindActionCreators(idActionCreators, dispatch),
        change: bindActionCreators(songsActionCreators, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayListDetail)