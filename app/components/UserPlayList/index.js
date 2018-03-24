import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import SongItem from '../Basic/songItem'

export default ({navigation, data, title}) => {
    const dataH = []
    data && data.map(item => {
        dataH.push({picUrl: item.coverImgUrl+'?param=300y280',name: item.name, trackCount: item.trackCount, id: item.id})
    })
    return (
        <View>
            <View style={styles.titleCon}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            { 
                dataH && 
                <View style={{flex: 1}}>
                {
                    dataH.map(item => {
                        return (
                            <View key={item.id} style={{flex: 1}}>
                                <SongItem type='userpl' navigation={navigation} data={item} />
                            </View>
                        )
                    })
                }
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 18,
        marginLeft: 20
    },
    titleCon: {
        backgroundColor: '#ddd',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        marginTop: 10,
        marginBottom: 12,
    },
})