import React, { PureComponent } from 'react'
import { TextInput, View, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import SearchMain from '../Search/search'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/navigation'
//#d43c33

const headerIcon = {
    backgroundColor: "transparent",
    underlayColor: "transparent",
    activeOpacity: 0.8,
    size: 30
}

class Search extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <TextInput style={
            {  
                height: 36, 
                // width: '80%', 
                width: '110%',
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingLeft: 10
            }}
            placeholderTextColor='#aaa'
            placeholder="请输入音乐、歌手、电台"/>,
        headerRight: (
            <Icon.Button
            {...headerIcon} name="ios-stats-outline" />
        ),
        headerLeft: (
            <Icon.Button {...headerIcon} style={{marginLeft: 10}} name="ios-mic-outline" />
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-radio-outline" size={30} color={tintColor} />
        ),
        tabBarLabel: '发现',
        headerStyle: {
            backgroundColor: '#d43c33',
            shadowOpacity: 0,
            height: 48
        },
        gesturesEnabled: false
    })
    componentDidMount() {
        const { navigation } = this.props
        this.props.updateFn.update(navigation)
    }
    render() {
        return (
            <SearchMain />
        )
    }
}
function mapStateToProps(state) {
    const { mainnav, uid } = state
    return {
        mainnav,
        uid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateFn: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)

