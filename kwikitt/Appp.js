import React, { Component } from 'react'
import {View,Text,Image,Button,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage';

 class PlaceOrder extends Component {
        constructor(){
            super()
            
            this.state={
                names:'',
                serviceImages:'',
                servId:null,
                userId:null
            }
        }

    getData = async () => {
        console.warn('getting')
        try {
            const value1 = await AsyncStorage.getItem('token')
            const abcd = JSON.parse(value1)
            const value2 = await AsyncStorage.getItem('orderId')
            const serviceId = JSON.parse(value2)
            this.setState({servId:serviceId,userId:abcd})
            axios.get(`http://147.139.33.186/service/${serviceId}`)
            .then((response)=>{
                console.warn(response)
                this.setState({
                    names:response.data.name,
                    serviceImages:response.data.serviceImage
                })
                console.warn(this.state.names)
            })
        } catch (e) {
            console.warn(e)
        }
    }

    componentDidMount(){
        this.getData()
    }

    render() {

        const {addId} = this.props.route.params
        const {serviceImages} = this.state
        return(
           <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
               <TextInput placeholder='Booking Remarks' />
               <View style={{flex:.45,backgroundColor:'white',width:230,justifyContent:'center',marginTop:60,elevation:6}}>
               <Image style={{width:120,height:120,alignSelf:'center',elevation:4}} source={{uri:`http://147.139.33.186/uploads/services/${serviceImages}`}}/>
                <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}}>{this.state.names}</Text>
               <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',color:'red'}}>RS.100</Text>
               </View>
               <View style={{flex:.10}}>
                    <TextInput placeholder="Booking Remarks"></TextInput>
               </View>
               <View style={{flex:.25}}>
               <TouchableOpacity

                    style={{}}
                    onPress={()=>{
                        axios.post('http://147.139.33.186/booking/place',{
                            addressId:addId,
                            bookingRemarks:this.state.names,
                            customerId:this.state.userId,
                            paymentMethod:'COD',
                            serviceId:this.state.servId
                        }).then(response => {
                            this.props.navigation.navigate('bookOrder')
                        }).catch(error => {
                            console.log(error)
                        })
                    }}
               >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Place Order</Text>
                            </LinearGradient>
                        </TouchableOpacity>
               </View>
           </View>
            
        )
    }
}

export default PlaceOrder;

const styles = StyleSheet.create({

    signIn: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
})