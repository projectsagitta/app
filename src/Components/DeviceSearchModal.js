import React, { Component } from 'react';

import {
    AsyncStorage,
    Modal,
    View,
    Text,
    Button
} from "react-native";

export default class DeviceSearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    componentDidMount(){
        AsyncStorage.getItem("alreadyLaunched").then(value => {
            if(value == null){                
                AsyncStorage.setItem('alreadyLaunched', 'true');
                this.setModalVisible(true);
            }
        }) 
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    
    render() {
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    style={{flex: 1,  backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}
                >
                    <View style={{flex: 1,  backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 16}}>
                        <Text style={{color: '#000', fontSize: 16}}>
                            Now is the right time to turn on the TCD-device! You can then start discovering the device by pressing the button "discover". 
                        </Text>
                        <View style={{ position: 'absolute',
                            bottom: 10,
                            left: 10,
                            right: 10}}>
                            <Button
                                title={'Got it!'}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}  />
                        </View>
                    </View>    
                        
                </Modal>
            </View>
        )
    }
}