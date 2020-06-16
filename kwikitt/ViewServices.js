import React, { Component } from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView, ImageBackground} from 'react-native'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';

class ViewServices extends Component {
    constructor(props){
        super(props)

    }


    onSubmit = async (value) => {
        try {
            await AsyncStorage.setItem('orderId', JSON.stringify(value))
            console.warn('submit')
        this.props.navigation.navigate('Order')
        } catch (e) {
            console.warn(e)
        }
    }

    render() {
        const {list}=this.props.route.params;
        return (
            <View>
                <Header/>
                <ScrollView>
                {
                    list.services.map(j=>(
                       <TouchableOpacity  onPress={()=>{
                           this.onSubmit(j.id)
                       }}
                       >
                        <ImageBackground style={{marginTop:5,marginLeft:5,marginRight:5,padding:5,backgroundColor:'white',borderWidth:4,borderColor:'white',marginTop:4,elevation:4,height:150}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1.8}}>
                                <View style={{flex:2}}>
                                <Text style={{fontSize:25,marginLeft:10,fontWeight:'bold'}} >{j.name}</Text>
                                <Text style={{marginLeft:10}}>{j.description}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>RS.{j.cost}</Text>
                                </View>
                            </View>
                            <View style={{flex:1,justifyContent:'center'}}>
                            <Image style={{height:100,width:100}} source={{uri:`http://147.139.33.186/uploads/services/${list.categoryImage}`}}/>
                           
                            </View>
                        </View>
                    </ImageBackground>
                    </TouchableOpacity>
                    ))
    }
                    </ScrollView>
            </View>
        )
    }
}

export default ViewServices
