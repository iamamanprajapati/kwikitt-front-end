import React, { Component } from 'react'
import {View,Text,Image,ActivityIndicator} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


export class ProfileScreen extends Component {
    constructor(){
        super()
        {global.MyVar}
        this.state={
            userId:null,
            name:'',
            email:'',
            mobile:'',
            isLoading:true
        }
    }


    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            const abcd = JSON.parse(value)
            this.setState({ userId: abcd })
            axios.get(`${global.MyVar}/user/${this.state.userId}`)
            .then(response=>{
                this.setState({name:response.data.data.name,
                                email:response.data.data.email,
                                mobile:response.data.data.mobile,
                                isLoading:false
                })
                
            })
        } catch (e) {
            console.warn(e)
        }
    }

    componentDidMount(){
        this.getData()

    }


    render() {
        const {isLoading} = this.state
        return (

            (isLoading===true)?
            <ActivityIndicator style={{flex:1}} size="large" color="#009386" />
            :
            <View style={{flex:1,backgroundColor:'#009386',alignItems:'center'}}>
                 <Image style={{ width: 120, height: 120,marginTop:60 }} source={require('../profile.png')} />
                 <Text style={{marginTop:20,marginLeft:10,fontWeight:'bold',fontSize:25,color:'white'}}>{this.state.name}</Text>
                 <Text style={{marginTop:10,marginLeft:10,fontWeight:'200',color:'white'}}> {this.state.email}</Text>
                <Text style={{marginTop:10,marginLeft:10,fontWeight:'200',color:'white'}}>{this.state.mobile}</Text>
            </View>
        )
    }
}

export default ProfileScreen
