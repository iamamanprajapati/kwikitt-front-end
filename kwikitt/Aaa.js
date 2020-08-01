import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Modal, { ModalContent,ModalButton } from 'react-native-modals';

class Aaa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            message: ''
        };
    }

    render() {
        return (
            <View>
                <Button
                    title="Show Modal"
                    onPress={() => {
                        this.setState({ visible: true });
                    }}
                />
                <Modal
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <ModalContent

                    >
                        <View style={{ height: 250, width: 300 }}>
                            <TextInput
                                placeholder="Write Your Review"
                                editable
                                style={{ marginTop: 10, width: 350, textAlignVertical: 'top', fontSize: 15, fontStyle: 'normal' }}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={(text) => {
                                    this.setState({ message: text });
                                }}
                            />
                        </View>
                    </ModalContent>
                    <ModalButton
                        height={20}
                        text="CANCEL"
                        onPress={() => { }}
                    />
                </Modal>
            </View>
        );
    }
}

export default Aaa;

console.disableYellowBox = true;

