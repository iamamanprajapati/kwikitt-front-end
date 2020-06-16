import React, { Component } from 'react'
import {View,Text,TextInput,TouchableOpacity,StyleSheet}  from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export class PlaceOrder extends Component {
    constructor(){
        super()
        this.state={
            remarks:''
        }
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'black'}}>
                <View style={{flex:.5}}>
                        <View style={{flexDirection:'row',flex:.5}}>
                            <View style={{backgroundColor:'yellow',flex:.35}}><Text>hello</Text></View>
                            <View style={{backgroundColor:'orange',flex:.65}}></View>
                        </View>
                        <View style={{flex:.50,backgroundColor:'green'}}>
                        
                        </View>
                        </View>
                        <View style={{flex:.20}}>
                        
                        </View>
                <View style={{flex:.3}}>
                        <View>
                        <TextInput
                                    placeholder="Enter Your Email"
                                    style={styles.textInput}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.validate(text)}
                                    value={this.state.email}
                                />
                        <TouchableOpacity>
                                    <LinearGradient
                                        colors={['#08d4c4', '#01ab9d']}
                                        style={styles.signIn}
                                    >
                                        <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
    }
}

export default PlaceOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS == 'android' ? -12 : 0,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
})