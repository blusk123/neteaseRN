import React, { PureComponent } from 'react'
import { ImageBackground, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../../actions/uid'
import { refresh } from '../../fetch/fetch'

class Splash extends PureComponent {
    state = {
        ret: null
    }
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    componentWillMount() {
        storage.load({
            key: 'loginState'
        }).then(ret => {
            this.setState({ret})
            // refresh()
            // this.props.setUid.set(ret.id)
        }).catch(err => {
            if (err.name === 'NotFoundError') {
                console.log(err)
            }
        })       
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.linkFn()
        }, 3000)
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
        this.timer = null
    }
    linkFn = () => {
        const { ret } = this.state
        ret ? this.props.navigation.navigate('Main')
        : this.props.navigation.navigate('Login')
    }
    toMain = () => {
        clearTimeout(this.timer)
        this.timer = null
        this.linkFn()
    }
    render() {
        return (
            <ImageBackground source={require('../../img/splash.jpeg')} style={{
                flex: 1,
            }}>
                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: 90,
                    right: 30,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    width: 80,
                    height: 30,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={this.toMain}>
                    <Text style={{fontSize: 16, color: '#fff'}}>跳过</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}
function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        setUid: bindActionCreators(ActionCreators, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Splash)