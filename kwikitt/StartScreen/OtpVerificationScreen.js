import React, { Component } from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Platform,TextInput,StatusBar } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import * as Animatable from 'react-native-animatable'
import axios from 'axios'
import SpinnerButton from 'react-native-spinner-button';
import AsyncStorage from '@react-native-community/async-storage';


class  OtpVerificationScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            otp:'',
            defaultLoading:false
        }
    }

    onSubmit = async (value) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(value))
        } catch (e) {
            console.warn(e)
        }
    }

    CheckTextInput = (data) => {
        if (this.state.otp.length >='4') {
            axios.post(`${global.MyVar}/user/verify/otp/finish`,{
                otp:this.state.otp,
                phone:data
              }).then(response=>{
                  if(!response.data.data.isRegistered){
                    this.props.navigation.navigate('RegistrationScreen',{
                        data1:data,
                    })
                  }
                  else{
                    this.onSubmit(response.data.data.id)
                    this.props.navigation.navigate('HomeScreen')
                  }
              }).catch(error=>{
                console.warn(error)
              })
        } else {
            this.setState({defaultLoading:false})
            alert('Please Enter OTP');
         
        }
      }
    

render(){
    const {data} =this.props.route.params
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009386'/>
            <View style={styles.header}>
                <Text style={styles.text_header}>OTP SCREEN</Text>
            </View>
            <Animatable.View 
            animation="slideInUp"
            duration={2000}
            style={styles.footer}>
                <View style={styles.action}>
                        <OTPInputView
                            style={{width: '80%', height: 200}}
                            pinCount={4}
                            onCodeChanged = {text => { this.setState({otp:text})}}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                />
                </View>
                <View>
                   <SpinnerButton
                                spinnerType="UIActivityIndicator"
                                buttonStyle={styles.buttonStyle}
                                isLoading={this.state.defaultLoading}
                                onPress={()=>{
                                    this.CheckTextInput(data)
                                    this.setState({ defaultLoading: true });
                                  }}
                            >
                                <Text style={styles.textSign}>OTP Verify</Text>
                            </SpinnerButton>
                </View>
            </Animatable.View>
        </View>
    )
}
}

export default OtpVerificationScreen;

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
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5,
        alignItems:'center'
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
        color:'white'
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#009387',
        borderRadius:7,
        marginTop:30
      }
})