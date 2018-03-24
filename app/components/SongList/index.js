import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import ListItem from '../Basic/listItem'

export default ({data, title}) => {
    const dataH = []
    data && data.map(item => {
        dataH.push({name: item.name, picUrl: item.picUrl+'?param=300y280', artistName: item.artist.name, id: item.id})
    })
    const h = 150
    return (
        <View>
            <View style={styles.titleCon}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            { 
                dataH && 
                <View style={styles.viewCon}>
                {
                    dataH.map((item, index) => {
                        return (
                            <View key={item.id} style={{width: '42%', marginBottom: 10}}>
                                <ListItem h={h} item={item} />
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
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
})