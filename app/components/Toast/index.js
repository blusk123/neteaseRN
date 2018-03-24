import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

export default class Toast extends PureComponent {
    state = {
        show: false
    }
    componentWillReceiveProps(nextprops) {
        if(nextprops.value !== 0) {
            const { show } = this.state
            if(!show) {
                clearTimeout(this.timer)
                this.timer = null
            }
            this.setState({
                show: true
            }) 
            this.timer = setTimeout(() => {
                this.setState({
                    show: false
                })
            }, 1200)  
        }
    }
    render() {
        const { show } = this.state
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                display: !show ? 'none' : 'flex',
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    backgroundColor: 'rgba(0,0,0,.5)',
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: '#fff',fontSize: 16}}>该功能待完善</Text>
                </View>
            </View>
        )
    }
}