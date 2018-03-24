import React, { PureComponent } from 'react'
import { View, Text, SectionList, TouchableOpacity } from 'react-native'
import Banner from '../../../components/Banner/index'
import MainList from '../../../components/MainList/index'
import Icon from 'react-native-vector-icons/Ionicons'
import Loading from '../../../components/Loading/loading'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../../actions/banner'
import * as personActionCreators from '../../../actions/personal'
import * as personnewActionCreators from '../../../actions/personnew'
import * as persondjActionCreators from '../../../actions/persondj'
import * as personmvActionCreators from '../../../actions/personmv'

// import { getBanner } from '../../../fetch/fetch'

class Recommend extends PureComponent {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <View style={{
                borderBottomWidth: 3,
                borderColor: tintColor === '#000' ? 'rgba(0,0,0,0)' : tintColor,
                borderStyle: 'solid',
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: tintColor,
                    fontSize:  tintColor === '#000' ? 14 : 15
                }}>推荐</Text>
            </View>
        )
    }
    getBannerFn() {
        this.props.fetchFn.getBan()
    }
    getPersonFn() {
        this.props.fetchPerson.getPerson()
    }
    getPersonNewFn() {
        this.props.fetchPersonNew.getPersonNew()
    }
    getPersonDJFn() {
        this.props.fetchPersonDJ.getPersonDJ()
    }
    getPersonMVFn = () => {
        this.props.fetchPersonMV.getPersonMV()
    }
    componentDidMount() {
        this.getBannerFn()
        this.getPersonFn()
        this.getPersonNewFn()
        this.getPersonDJFn()
        this.getPersonMVFn()
    }
    renderItem = ({item}) => {
        const { navigation } = this.props.mainnav
        const renderitem = item.data ? 
        <MainList navi={navigation} navigation={this.props.navigation} title={item.title} type={item.type} data={item.data} />
        : <Loading size={30} />
        return renderitem
    }
    toRadio = () => {
        const { navigation } = this.props.mainnav
        navigation.navigate('Video')
    }
    renderFooter = () => {
        return (
            <TouchableOpacity onPress={this.toRadio} >
                <View style={{borderTopWidth: .5,
                            borderColor: '#ddd',
                            borderStyle: 'solid',
                            marginTop: 15}}>
                    <Text style={{
                            textAlign: 'center',
                            margin: 20,
                            fontWeight: '300',
                            fontSize: 12,
                            color: '#777'
                        }}>
                        看视屏，发现更多有趣内容 <Icon name="ios-arrow-forward" size={14} />
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const { banner, personal, personnew, navigation, persondj, personmv } = this.props
        const datanew = []
        personnew.data.result && personnew.data.result.map(item => {
            datanew.push({picUrl: item.song.album.picUrl, name: item.name, artistName: item.song.artists[0].name,id: item.id, type: item.type})
        })
        return (
            <View style={{flex: 1}}>
                <SectionList
                    renderItem={this.renderItem}
                    ListFooterComponent={this.renderFooter}
                    ListHeaderComponent={<Banner imgData={banner.data.banners} />}
                    sections={[
                        {key: 's1', data:[{key: 1, type: '1', title: '推荐歌单', data: personal.data.result}]},
                        {key: 's2', data:[{key: 2, type: '2', title: '最新音乐', data: datanew}]},
                        {key: 's3', data:[{key: 3, type: '3', title: '主播电台', data: persondj.data.result}]},
                        {key: 's4', data:[{key: 4, type: '4', title: '推荐MV', data: personmv.data.result}]}
                    ]}/>               
            </View>
        )
    }
}

function mapStateToProps(state) {
    const { banner, personal, personnew, persondj, personmv, mainnav } = state
    return {
        banner,
        personal,
        personnew,
        persondj,
        personmv,
        mainnav
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFn: bindActionCreators(actionCreators, dispatch),
        fetchPerson: bindActionCreators(personActionCreators, dispatch),
        fetchPersonNew: bindActionCreators(personnewActionCreators, dispatch),
        fetchPersonDJ: bindActionCreators(persondjActionCreators, dispatch),
        fetchPersonMV: bindActionCreators(personmvActionCreators, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Recommend )

