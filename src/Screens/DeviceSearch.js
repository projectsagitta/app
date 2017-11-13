import React, { Component } from 'react';
import {    
    StyleSheet,
    Text,
    View
} from 'react-native';
import BluetoothConnection from '../Components/BluetoothConnection';
import DeviceSearchModal from '../Components/DeviceSearchModal';

export default class DeviceSearch extends Component {
    
    render() {               
        return(
            <View style={styles.container}>                               
                <BluetoothConnection /> 
                <DeviceSearchModal />
            </View>
        );        
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        fontSize: 20,
        marginVertical: 20,
        color: '#000',
        textAlign: 'center'
    }
});