import React, { Component } from 'react';
import axios from 'axios'

import { Alert, Image, Platform, StyleSheet, Text, TouchableHighlight, View,Button,ScrollView } from 'react-native';

import PropTypes from 'prop-types';

class Selected_Items_Array {
  constructor() {
    selectedItemsArray = [];
  }

  pushItem(option) {
    selectedItemsArray.push(option);
  }

  getArray() {
    return selectedItemsArray;
  }
}

class Checkbox extends Component {
  constructor() {
    super();
    this.state = { checked: null }
  }

  componentWillMount() {

    if (this.props.checked) {
      this.setState({ checked: true }, () => {
        this.props.selectedArrayObject.pushItem({
          'key': this.props.keyValue,
          'label': this.props.label,
          'value': this.props.value
        });
      });
    }
    else {
      this.setState({ checked: false });
    }
  }

  toggleState(key, label, value) {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        this.props.selectedArrayObject.pushItem({ 'key': key, 'label': label, 'value': value });
      }
      else {
        this.props.selectedArrayObject.getArray().splice(this.props.selectedArrayObject.getArray().findIndex(x => x.key == key), 1);
      }
    });
  }

  render() {
    return (

      <TouchableHighlight
        onPress={this.toggleState.bind(this, this.props.keyValue, this.props.label, this.props.value)}
        underlayColor="transparent"
        style={{ marginVertical: 10 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ width: this.props.size, height: this.props.size, backgroundColor: this.props.color, padding: 3 }}>
            {
              (this.state.checked)
                ?
                (<View style={styles.checkedView}>
                  <Image source={require('./assets/check.png')} style={styles.checkBoxImage} />
                </View>)
                :
                (<View style={styles.uncheckedView} />)
            }

          </View>

          <Text style={[styles.checkBoxLabelText, { color: this.props.labelColor }]}>{this.props.label}</Text>

        </View>

      </TouchableHighlight>
    );
  }
}

export default class Appp extends Component {

  constructor(props) {
    super(props);
    selectedArrayOBJ = new Selected_Items_Array();
    this.state = { 
            selectedItems:[],
            data:[],                    
                 }
            }

  componentDidMount() {
        axios.get('http://98bc3d385018.ngrok.io/service/list').then((response) => {
            console.log(response.data.data)
          this.setState({
            data: response.data.data,
          });
        });
      }

    onSubmit=()=>{
      console.log(selectedArrayOBJ.getArray().map(item => item.value));
    }

  getSelectedItems = () => {

    if (selectedArrayOBJ.getArray().length == 0) {

      Alert.alert('No Items Selected!');
    }
    else {
      console.log(selectedArrayOBJ.getArray().map(item => item.value));
        axios.post('http://98bc3d385018.ngrok.io/service-partner/assign-service',{
            services:selectedArrayOBJ.getArray().map(item => item.value),
            userId:37
        }).then(response=>(
            console.log(response)
        ))
    }
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{fontSize:20}}>इनमे से आप कौन सा कार्य कर सकते हैं ?</Text>
        <ScrollView style={{flex:1,marginTop:30}}>
          {
              this.state.data.map(list=>(
                <View  style={{flexDirection:'row'}}>
                  <View style={{flex:3}}>
        <Checkbox size={30}
          keyValue={list.id}
          selectedArrayObject={selectedArrayOBJ}
          checked={false}
          color="#0091EA"
          labelColor="#0091EA"
          label={list.name}
          value={list.id}
          />
          </View>
          <View style={{flex:1}}>
          <Image
                      style={{height: 50, width: 50,marginTop:10}}
                      source={{
                        uri: `http://98bc3d385018.ngrok.io/uploads/services/${list.serviceImage}`,
                      }}
                    />
                    </View>
                    </View>
          ))
          }
          
          </ScrollView>
          <View>
        <TouchableHighlight underlayColor="#000" style={styles.selectedItemsButton} onPress={this.getSelectedItems}>
          <Text style={styles.selectedItemsButton_Text}>Get Selected Items</Text>
        </TouchableHighlight>
        <Text style={{ fontSize: 20, color: "#000", marginTop: 20 }}> {this.state.selectedItems} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      padding: 20,
    },

    selectedItemsButton:
    {
      marginTop: 25,
      padding: 8,
      backgroundColor: '#2962FF',
    },

    selectedItemsButton_Text:
    {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'stretch',
      fontSize: 18
    },

    checkedView:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    checkBoxImage:
    {
      height: '80%',
      width: '80%',
      tintColor: 'white',
      resizeMode: 'contain'
    },

    uncheckedView:
    {
      flex: 1,
      backgroundColor: 'white'
    },

    checkBoxLabelText:
    {
      fontSize: 16,
      paddingLeft: 10
    }
  });

Checkbox.propTypes =
  {
    size: PropTypes.number,
    keyValue: PropTypes.number.isRequired,
    selectedArrayObject: PropTypes.object.isRequired,
    color: PropTypes.string,
    label: PropTypes.string,
    labelColor: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool
  }

Checkbox.defaultProps =
  {
    size: 30,
    color: '#636c72',
    labelColor: '636c72',
    label: 'Default',
    checked: false,
    value: 'Default'
  }