import React, { Component } from 'react'
import { View, Text, Button, Dimensions, StyleSheet, Image,TouchableOpacity,StatusBar, Linking,Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { color } from 'react-native-reanimated'

class SplashScreen extends Component {
    constructor(){
        super()
        console.warn('run')
        global.MyVar='http://b82ffa97a28b.ngrok.io'
        this.state={
            userId:null,
        }
    }

    
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            const abcd = JSON.parse(value)
            this.setState({ userId: abcd })
            if(this.state.userId!=null){
                this.props.navigation.navigate('HomeScreen')
            }
            axios.post(`${global.MyVar}/app-version/validate`,{
                platform:'ANDROID',
                version:'1.0.0'
            })
            .then(response=>{
                if(response.data.data.status===false){
                    Alert.alert(
                        'please update the app to use our services',
                        'Would you like to authenticate using fingerprint ?',
                        [
                          {text: 'Yes', onPress: this.openURL},
                        ],
                        { cancelable: false }
                      )
                    
                }
            })
            
        } catch (e) {
            console.warn(e)
        }
    }

    openURL=()=>{
        Linking.openURL("market://details?id=in.kwikitt")
    }

    componentDidMount(){
        this.getData()
    }

    render(){
    return (
        (this.state.userId===null) ? 
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' />
            <View style={styles.header}>
                <Animatable.Image
                        animation="bounceIn"
                        duration={1500}
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                duration={3000}
                style={styles.footer}
                >
                <Text style={styles.title}>Join with Kwikitt</Text>
                <View style={{alignItems:'flex-end',marginTop:'15%'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('MobileVerificationScreen')}>
                    <LinearGradient
                        colors={['#bf7366','#007340']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Get Started</Text>
                        <MaterialIcons 
                            name='keyboard-arrow-right'
                            color='#fff'
                            size={20}
                        />
                    </LinearGradient>
                </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
        :
        <View style={{backgroundColor:`${color}`}}>
            
        </View>
    )
}      
}


export default SplashScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * .50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo,
        marginTop:100
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
})