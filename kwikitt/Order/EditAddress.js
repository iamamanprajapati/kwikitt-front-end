import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, StatusBar, CheckBox } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'

class EditAddress extends Component {
    constructor() {
        super()
        this.state = {
            city: 'Shahjahanpur',
            street: '',
            pinCode: '242001',
            state: 'Uttar Pradesh'
        }
    }

    render() {
        const { id1, street1 } = this.props.route.params
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#009386' />
                <View
                    style={styles.footer}>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Area, Colony, Street, Sector"
                            style={styles.textInput}
                            editable={true}
                            onChangeText={(text) => {
                                this.setState({ street: text })
                            }}
                            value={this.state.street}
                        />
                    </View>


                    <View style={styles.action}>
                        <TextInput
                            placeholder="Town/City"
                            editable={false}
                            style={styles.textInput}
                            onChangeText={(text) => {
                                this.setState({ city: text })
                            }}
                            value={this.state.city}
                        />
                    </View>

                    <View style={styles.action}>
                        <TextInput
                            placeholder="PIN Code"
                            editable={false}
                            style={styles.textInput}
                            keyboardType='number-pad'
                            onChangeText={(text) => {
                                this.setState({ pinCode: text })
                            }}
                            value={this.state.pinCode}
                        />
                    </View>

                    <View style={styles.action}>
                        <TextInput
                            placeholder="State"
                            editable={false}
                            style={styles.textInput}
                            onChangeText={(text) => {
                                this.setState({ state: text })
                            }}
                            value={this.state.state}
                        />
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                axios.post('http://147.139.33.186/api/address/add-or-update', {
                                    city: this.state.city,
                                    street: this.state.street,
                                    pinCode: this.state.pinCode,
                                    state: this.state.state,
                                    userId: 45,
                                    id: id1
                                }).then(response => {
                                    this.props.navigation.navigate('Address')
                                }).catch(error => {
                                    console.log(error)
                                })
                            }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Add</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}


export default EditAddress;

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
        paddingVertical: 80,
        paddingHorizontal: 20,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: 'black',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        color: 'black',
        paddingLeft: 10,
        fontWeight: '800',
        fontSize: 15
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