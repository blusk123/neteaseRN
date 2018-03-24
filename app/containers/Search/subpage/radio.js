import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class Radio extends PureComponent {
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
                }}>主播电台</Text>
            </View>
        ),
    }
    render() {
        return (
            <LinearGradient
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{ 
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} colors={[
                        'rgba(0,0,0,.7)',
                        'rgba(0,0,0,.4)',
                        'rgba(0,0,0,.7)'
                    ]}> 
                    <Text style={{
                        backgroundColor: 'transparent',
                        fontSize: 16,
                        color: '#fff'
                    }}>这是电台页(待某天完善)</Text>
            </LinearGradient>
        )
    }
}