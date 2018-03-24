import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'

export default class Login extends PureComponent {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    toLogin = () => {
        this.props.navigation.navigate('LoginMain')
    }
    render() {
        return (
            <ImageBackground source={require('../../img/splash.png')}
                style={{
                    flex: 1
                }}>
                <View style={{
                    backgroundColor: 'rgba(255,255,255,.6)',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={styles.btn} onPress={this.toLogin}>
                        <Text style={styles.text}>手机号登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.text}>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 30,
                        borderBottomWidth: 1,
                        borderBottomColor: '#666'
                    }}>
                        <Text style={{color: '#666'}}>游客试用</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        borderColor: '#d43c33',
        borderWidth: 1,
        marginTop: 10,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    text: {
        color: '#d43c33',
        fontSize: 16
    }
})