import React, { PureComponent } from 'react'
import { TextInput, TouchableOpacity, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import HeaderBac from '../../components/Basic/headerbac'
import Loading from '../../components/Loading/loading'

import { getLogin } from '../../fetch/fetch'

export default class LoginMain extends PureComponent {
    state = {
        phone: "",
        password: "",
        isFetching: false
    }
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    changePhone = (e) => {
        this.setState({
            phone: e
        })
    }
    changePwd = (e) => {
        this.setState({
            password: e
        })
    }
    loginFn = () => {
        const { phone, password } = this.state
        this.setState({
            isFetching: true
        })
        getLogin({phone, password}).then(res => {
            if(res.code === 200) {
                storage.save({
                    key: 'loginState',
                    data: {
                        id: res.account.id,  
                    },
                    expires: null
                })               
            }
            this.props.navigation.navigate('Main')
        }).catch(err => {
            console.log(err)
            this.setState({
                isFetching: false
            })
        })
    }
    render() {
        const { navigation } = this.props 
        const { phone, isFetching } = this.state
        return (
            <View style={{flex: 1}}>
                <HeaderBac navigation={navigation} title="手机号登录" />
                <View style={{paddingHorizontal: 20, flex: 1}}>
                    <View style={{
                        height: 40,
                        marginTop: 10,
                        borderBottomWidth: 1,
                        borderColor: '#ccc',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon style={{color: '#666', width: 20}} name="ios-phone-portrait-outline" size={24}/>
                        { phone === "" ? null : <Text>+86</Text>}
                        <TextInput
                            onChangeText={this.changePhone}
                            style={{marginLeft: 10, fontSize: 16, flex: 1}} placeholder="请输入手机号" />
                    </View>
                    <View style={{
                        height: 40,
                        marginTop: 10,
                        borderBottomWidth: 1,
                        borderColor: '#ccc',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon style={{color: '#666', width: 20}} name="ios-unlock-outline" size={24}/>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={this.changePwd}
                            style={{marginLeft: 10, fontSize: 16, flex: 1}} placeholder="请输入密码" />   
                    </View>
                    <TouchableOpacity onPress={this.loginFn} style={{
                            marginTop: 30,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#d43c33',
                            borderRadius: 20
                        }}>
                        <Text style={{color: '#fff', fontSize: 16}}>登录</Text>
                    </TouchableOpacity>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        <Text style={{color: '#666', fontSize: 12}}>(必须输入正确信息，否则后台服务直接停止)</Text>
                    </View>
                </View>
                {
                    isFetching &&
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                        }}>
                        <Loading size={40}/>
                    </View>
                }
            </View>
        )
    }
}