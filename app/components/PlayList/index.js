import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import ListItem from '../Basic/listItem'

export default ({data, navigation}) => {
    const dataH = []
    data && data.map(item => {
        dataH.push({name: item.name, picUrl: item.coverImgUrl+'?param=300y280',playCount: item.playCount, id: item.id})
    })
    const h = 170
    return (
        <View>
            { 
                dataH && 
                <View style={styles.viewCon}>
                {
                    dataH.map((item, index) => {
                        return (
                            <View key={item.id} style={{width: '49.6%', marginBottom: 10}}>
                                <ListItem navigation={navigation} type='1' h={h} item={item} />
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
        fontSize: 15,
        fontWeight: '300',
        lineHeight: 18
    },
    titleCon: {
        borderLeftWidth: 4,
        borderColor: '#d43c33',
        borderStyle: 'solid',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 12,
    },
    viewCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
})