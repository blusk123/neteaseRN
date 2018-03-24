import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ListItem from '../Basic/listItem'

const countFn = (count) => {
    const i = count > 100000 ? (Math.floor(count/10000) + '万') : Math.floor(count)
    return i
}
const toOthers = (navigation, navi, type) => {
    switch(type) {
        case '1':
            navigation.navigate('song')
            break
        case '2':
            navi.navigate('Music')
            break
        case '3':
            navigation.navigate('radio')
            break
        case '4':
            navi.navigate('Movie')
    }
}

export default ({ data, title, type, navigation, navi }) => {
    const dataF = data && ( type === '4' ? data.slice(0,2) : data.slice(0,3))
    const dataS = data && ( type === '4' ? data.slice(2,4) : data.slice(3,6))
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
            marginBottom: 12
        },
        view: {
            width: type === '4' ? '49.7%' : '32.8%'
        }
    })
    const h = 120
    return (
        <View>
            <View>
                <TouchableOpacity style={{width: 80}} onPress={() => toOthers(navigation, navi, type)}>
                    <View style={styles.titleCon}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Icon style={{marginLeft: 10}} name="ios-arrow-forward" size={20}/>
                    </View>
                </TouchableOpacity>
            </View>
            { 
                dataF && 
                <View style={styles.viewCon}>
                {
                    dataF.map((item, index) => {
                        return (
                            <View key={item.id} style={styles.view}>
                                <ListItem h={h} navigation={navi} type={type} item={item}/>
                            </View>
                        )
                    })
                }
                </View>
            }
            {
                dataS &&
                <View style={styles.viewCon}>
                {
                    dataS.map((item, index) => {
                        return (
                            <View key={item.id} style={styles.view}>
                                <ListItem h={h} navigation={navi} type={type} item={item}/>
                            </View>
                        )
                    })
                }
                </View>
            }
        </View>
    )
}