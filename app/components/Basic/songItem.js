import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({data, type, index, navigation, updateId}) => {
    const IconStyle = {
        backgroundColor: "transparent",
        activeOpacity: 0.8,
        size: 36
    }
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        left: {
            flex: 2,
            alignItems: 'center',
            paddingHorizontal: type === 'userpl' ? 10 : 0
        },
        right: {
            flex: 14,
            paddingVertical: 10,
            borderBottomWidth: 0.5,
            borderStyle: 'solid',
            borderColor: '#ccc',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 5,
            alignItems: 'center'
        }
    })
    let v 
    if(type !== 'userpl') {
        v = data.artists[0].name + "-" + data.album.name
    }else {
        v = data.trackCount + '首'
    }
    toPlayScene = () => {
        if(type === 'userpl') {
            data.id && navigation.navigate('PlayListDetail',{
                id: data.id
            })
        }else {
            navigation.navigate('PlayerScene')
            updateId(index)
        }
    }
    return (
        <TouchableOpacity onPress={toPlayScene} style={styles.container}>
            <View style={styles.left}>
                {type !== 'userpl' ?
                    <Text style={{color: '#777'}}>{index+1}</Text>
                    :
                    <Image style={{width: 56,height: 56}} source={{uri: data.picUrl + '?param=45y45'}} />
                }
            </View>
            <View style={styles.right}>
                <View style={{flex: 9}}>
                    <View>
                        <Text style={{
                            overflow:'hidden'
                        }}>{data.name}</Text>
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={{ 
                            fontSize: 10, 
                            color: '#777',
                            overflow:'hidden'
                            }}>
                            {v}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Icon.Button color="#777" {...IconStyle} size={24} name="md-more"/>
                </View>
            </View>
        </TouchableOpacity>
    )
}