import React, { Component } from 'react'
import {View,Text,TouchableOpacity,ImageBackground,Image,ScrollView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import {Header} from '../Header'

export class MyOrders extends Component {

    constructor(props){
        super(props)
        {global.MyVar}
        this.state={
          data:[],
          serviceName:'',
          userId:null
        }
      } 

      getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            const abcd = JSON.parse(value)
            this.setState({ userId: abcd })
                const id = this.state.userId
                axios.get(`${global.MyVar}/booking/list/${id}`)
            .then(response => {
                this.setState({
                    data: response.data.data,
                })
            })
        } catch (e) {
            console.warn(e)
        }
    }

    refreshComponent = () =>{
        this.getData()
       }
    
      componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => this.refreshComponent())
      }

    componentWillUnmount() {
        this._unsubscribe();
      }

    render() {

        const {data} = this.state

        return (
            <View style={{flex:1}}>
                <Header/>
            <ScrollView style={{flex:1}}>
            {
                data.map(list=>(
                    <View key={list.id} style={{flex:1}}>
                        <TouchableOpacity>
                        <ImageBackground style={{marginTop:5,marginLeft:5,marginRight:5,padding:5,backgroundColor:'white',borderWidth:4,borderColor:'white',marginTop:4,elevation:4,height:150}}>
                        <View style={{flex:1,flexDirection:'column'}}>
                            <View style={{flex:3,flexDirection:'row'}}>
                                <View style={{flex:2}}>
                                <Text style={{fontSize:16,marginLeft:10}} >{list.service.name}</Text>
                                    <Text>{list.rating}</Text>
                                <Text style={{marginLeft:10,marginTop:10,fontSize:10,color:'green'}}>{'\u2B24'}<Text style={{fontSize:12}}>{list.bookingDate}</Text></Text>
                                <Text style={{marginLeft:10,marginTop:18,fontSize:15,color:'red'}}>{list.bookingStatus}</Text>
                                </View>
                                <View style={{flex:1,justifyContent:'center'}}>
                                <Image style={{height:100,width:100}} source={{uri:`${global.MyVar}/uploads/services/${list.service.serviceImage}`}}/>
                            </View>
                            </View>
                        </View>
                    </ImageBackground>
                    </TouchableOpacity>
                    </View>
                ))
            }
      </ScrollView>
      </View>
        )
    }
}

export default MyOrders
