import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, StatusBar, CheckBox } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

class RegistrationScreen extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            name: '',
            roles: [
                'ROLE_SERVICE_USER',
                ''
            ],
            isSelected: false,
        }
    }

    onSubmit = async (value) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(value))
        } catch (e) {
            console.warn(e)
        }
    }


    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            console.log("Email is Correct");
        }
    }



    chackBoxChange = (val) => {
        if (val === true) {
            this.setState({
                isSelected: false,
            })
            this.state.roles[1] = ''
        }
        else {
            this.setState({
                isSelected: true,
            })
            this.state.roles[1] = 'ROLE_SERVICE_PROVIDER'
        }
    }

    render() {
        const { data1,id1 } = this.props.route.params

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#009386' />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Registration Form</Text>
                </View>
                <Animatable.View
                    animation="slideInUp"
                    duration={2000}
                    style={styles.footer}>
                    <View style={styles.action}>
                        <MaterialCommunityIcons
                            name='gmail'
                            color='#05375a'
                            size={25}
                        />
                        <TextInput
                            placeholder="Enter Your Email"
                            style={styles.textInput}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={(text) => this.validate(text)}
                            value={this.state.email}
                        />
                    </View>

                    <View style={styles.action}>
                        <MaterialCommunityIcons
                            name='account'
                            color='#05375a'
                            size={25}
                        />
                        <TextInput
                            placeholder="Enter Your Name"
                            style={styles.textInput}
                            onChangeText={(text) => {
                                this.setState({ name: text })
                            }}
                        />
                    </View>

                    <View style={styles.action}>
                        <CheckBox
                            value={this.state.isSelected}
                            onChange={() => this.chackBoxChange(this.state.isSelected)}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Do you want to be make service provider?</Text>
                    </View>
                    <View>
                        <Text>{data1}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                axios.post('http://147.139.33.186/user/register', {
                                    email: this.state.email,
                                    name: this.state.name,
                                    phone: data1,
                                    roles: this.state.roles
                                }).then(response => {
                                    this.onSubmit(response.data.data.id)
                                    this.props.navigation.navigate('HomeScreen')
                                }).catch(error => {
                                    console.warn(error)
                                })
                            }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </Animatable.View>
            </View>
        )
    }
}


export default RegistrationScreen;

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