import React, { Component } from 'react'
import { Text, View } from 'react-native'


export class Checkbox extends Component {
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

export default checkbox