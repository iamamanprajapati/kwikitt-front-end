import React, { Component } from 'react'
import { View, Text, StyleSheet, Image,TouchableNativeFeedback, ScrollView, ImageBackground, Dimensions, TouchableHighlight } from 'react-native'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';

const Height = Dimensions.get('window').height;
const Height1 = 110
const Width = Dimensions.get('window').width;
const Width1=Width-4

class ViewServices extends Component {
    constructor(props) {
        super(props)
        { global.MyVar }

    }

    onSubmit = async (value) => {
        try {
            await AsyncStorage.setItem('orderId', JSON.stringify(value))
            this.props.navigation.navigate('Order')
        } catch (e) {
            console.warn(e)
        }
    }

    render() {
        const { list } = this.props.route.params;
        return (
            <View style={{ flex: 1}}>
                <Header />
                <ScrollView style={{ flex: 1 }}>
                    {
                        list.services.map(j => (
                            <ImageBackground style={{width:Width1,alignSelf:'center',elevation:5,height:Height1,backgroundColor:'white',marginTop:1}} >
                            <TouchableNativeFeedback
                            onPress={() => {
                                this.onSubmit(j.id)
                            }}
                            background={TouchableNativeFeedback.Ripple('#bfbfbf')}
                            >
                                
                                    <View key={j.name} style={{ flex: 1, flexDirection: 'row' }}>
                                        <View key={j.name} style={{ flex: 1.8 }}>
                                            <View key={j.name} style={{ flex: 2 }}>
                                                <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: 'bold',marginTop:10 }} >{j.name}</Text>
                                            </View>
                                        </View>
                                        <View key={j.serviceImage} style={{ flex: 1, justifyContent: 'center' }}>
                                            <Image style={{ height: 100, width: 100 }} source={{ uri: `${global.MyVar}/uploads/services/${j.serviceImage}` }} />
                                        </View>
                                    </View>
                            </TouchableNativeFeedback>
                            </ImageBackground>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

export default ViewServices
console.disableYellowBox = true;
