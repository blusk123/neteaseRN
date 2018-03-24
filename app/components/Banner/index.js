import React, { PureComponent } from 'react'
import { View, Text, Image } from 'react-native'
import Swiper from 'react-native-swiper'

export default class Banner extends PureComponent {
    render() {
        const { imgData } = this.props
        const h = 160
        return (
            <View style={{height: h}}>
            {
                imgData && <Swiper autoplay height={h}
                    paginationStyle={{bottom:5}}
                    showsPagination={true} dotColor="#ccc"
                    activeDotColor='#e9203d' horizontal={true}>
                    { imgData.map((v, index) => (
                                <View key={index} style={{
                                    backgroundColor: 'transparent',
                                    flex: 1,
                                }}>
                                    <Image resizeMode='stretch' style={{width: '100%',height: 140}} source={{uri: v.pic}}/>
                                </View>
                            )
                        )
                    }
                </Swiper>
            }
            </View>
        )
    }
}
