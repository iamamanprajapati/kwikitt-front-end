import React, { Component } from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView, ImageBackground,Dimensions,TouchableHighlight} from 'react-native'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';

const Height = Dimensions.get('window').height;
const Height1=120

class ViewServices extends Component {
    constructor(props){
        super(props)
        {global.MyVar}

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
        const {list}=this.props.route.params;
        return (
            <View  style={{flex:1}}>
                <Header/>
                <ScrollView style={{flex:1}}>
                {
                    list.services.map(j=>(
                       <TouchableHighlight  onPress={()=>{
                           this.onSubmit(j.id)
                       }}
                       >
                        <ImageBackground style={{marginTop:5,marginLeft:5,marginRight:5,padding:5,backgroundColor:'white',borderWidth:4,borderColor:'white',marginTop:4,elevation:10,height:Height1}}>
                        <View key={j.name}  style={{flex:1,flexDirection:'row'}}>
                            <View key={j.name} style={{flex:1.8}}>
                                <View key={j.name} style={{flex:2}}>
                                <Text style={{fontSize:20,marginLeft:10,fontWeight:'bold'}} >{j.name}</Text>
                                </View>
                            </View>
                            <View key={j.id} style={{flex:1,justifyContent:'center'}}>
                            <Image style={{height:100,width:100}} source={{uri:`${global.MyVar}/uploads/services/${j.serviceImage}`}}/>
                            </View>
                        </View>
                    </ImageBackground>
                    </TouchableHighlight>
                    ))
                }
                    </ScrollView>
            </View>
        )
    }
}

export default ViewServices
