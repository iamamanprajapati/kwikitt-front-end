import React, { Component } from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Platform,TextInput,StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
import axios from 'axios'

class  MobileVerificationScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            phone:''
        }
    }

render(){
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009386'/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome</Text>
            </View>
            <Animatable.View 
            animation="slideInUp"
            duration={2000}
            style={styles.footer}>
                <View style={styles.action}>
                    <FontAwesome 
                        name='mobile'
                        color='#05375a'
                        size={30}
                    />
                        <TextInput 
                            placeholder="Enter Your Mobile"
                            style={styles.textInput}
                            keyboardType='number-pad'
                            onChangeText={(text)=>{
                            this.setState({phone:text})
                        }}/>
                </View>
                <View>
                    <TouchableOpacity style={{marginTop:20}} 
                        onPress={()=>{
                            axios.post('http://147.139.33.186/user/verify/otp/init',{
                              phone:this.state.phone
                            }).then(response=>{
                              console.warn(response)
                              this.props.navigation.navigate('OtpVerificationScreen',{
                                data:this.state.phone
                              })
                            }).catch(error=>{
                              console.log(error)
                            })
                          }}
                    >
                    <LinearGradient
                        onPress={()=>alert('button')}
                        colors={['#08d4c4','#01ab9d']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign,{color:'#fff'}]} >Sign In</Text>
                    </LinearGradient>
                   </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}
}

export default MobileVerificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal:20,
        paddingBottom:50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30
    },
    text_footer:{
        color:'#05375a',
        fontSize:18,

    },
    action:{
        flexDirection:'row',
        marginTop:80,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        marginTop:Platform.OS=='android' ? -12:0,
        paddingLeft:10,
        color:'#05375a'
    },
    button:{
        alignItems:'center',
        marginTop:50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize:18,
        fontWeight: 'bold',
    }
})