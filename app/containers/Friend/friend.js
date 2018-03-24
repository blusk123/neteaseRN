import React, { PureComponent } from 'react'
import { View, Text, FlatList } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/event'
import * as indexActionCreators from '../../actions/mc_index'
import * as songActionCreators from '../../actions/songs'

import FriendListItem from '../../components/FriendListItem/index'
import Loading from '../../components/Loading/loading'

class FriendMain extends PureComponent {
    getEventFn = () => {
        const i = Date.now()
        this.props.fetchEvent.getEve({timestamp: i})
    }
    componentDidMount() {
        this.getEventFn()
    }
    componentWillReceiveProps(newprops) {
        const { data, isFetching } = newprops.event
        if(!isFetching) {
            const datas  = data.event
            const songArr = []
            datas && datas.map(item => {
                const jsonData = JSON.parse(item.json)
                // console.log(jsonData.song)
                jsonData.song && songArr.push({id: jsonData.song.id, pic: jsonData.song.album.picUrl})
            })
            this.props.updateSongs.changeSongs(songArr)
        }
    }
    renderItem = ({item, index}) => {
        const { navigation, event } = this.props
        console.log(item)
        const i = JSON.parse(item.json).song
        const ele = i && <FriendListItem update={this.updateIndex} index={index} navigation={navigation} data={item} />
        const renderitem = event.data.event ? ele : <Loading size={50} />
        return renderitem
    }
    updateIndex = (index) => {
        this.props.updateIndex.update(index)
    }
    render() {
        const { event } = this.props
        event.data.event && console.log(event)
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <FlatList 
                    keyExtractor={(item,index) => index}
                    renderItem={this.renderItem}
                    data={event.data.event}/>
            </View>
        )
    }
}

const mapStateToProps = ({event}) => ({
    event
})

const mapDispatchToProps = dispatch => ({
    fetchEvent: bindActionCreators(actionCreators, dispatch),
    updateIndex: bindActionCreators(indexActionCreators, dispatch),
    updateSongs: bindActionCreators(songActionCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendMain)