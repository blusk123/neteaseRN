import React, { PureComponent } from 'react'
import { View, Text, FlatList } from 'react-native'
import HeaderBac from '../../components/Basic/headerbac'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/topalbum'
import * as loadActionCreators from '../../actions/songmore'

import List from '../../components/SongList/index'
import Loading from '../../components/Loading/loading'

class Music extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
    })
    getTopAlFn = () => {
        const item = { limit: 50 }
        this.props.fetchFn.getTopAl(item)
    }
    componentDidMount() {
        this.getTopAlFn()
    }
    // componentWillReceiveProps(newprops, oldprops) {
    //     const { val } = this.state
    //     if(newprops.topalbum.isFetching === false) {
    //         const data = newprops.topalbum.data.albums
    //         const { songmore } = oldprops 
    //         const item = {}
    //         this.props.loadMore.update({...item,data: data, key: val, title:"新碟上架"})
    //     }
    // }
    renderItem = ({item}) => {
        return <List data={item.data} title={item.title} />
    }
    // loadMore = () => {
    //     this.timer = setTimeout(() => {
    //         this.getTopAlFn()
    //     },100)
    // }
    render() {
        const { topalbum, songmore, navigation  } = this.props      
        return (
            <View style={{flex: 1}}>
                <HeaderBac title="新碟上架" navigation={navigation} />
                {
                    topalbum.isFetching === true ? 
                    <Loading /> :
                    <FlatList 
                        data={[
                            {key:1, title: '新碟上架', data: topalbum.data.albums }
                        ]}
                        renderItem={this.renderItem}
                        />
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    const { topalbum, songmore } = state
    return {
        topalbum,
        songmore
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFn: bindActionCreators(actionCreators, dispatch),
        loadMore: bindActionCreators(loadActionCreators, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Music)