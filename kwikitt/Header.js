import React, { Component } from 'react'
import { View,Text } from 'react-native'

export class Header extends Component {
    render() {
        return (
            <View style={{backgroundColor:'#009387'}}>
                <Text style={{fontWeight:'bold',fontSize:25,marginLeft:10,marginTop:10,paddingBottom:10,color:'white'}}>Kwikitt</Text>
            </View>
        )
    }
}

export default Header