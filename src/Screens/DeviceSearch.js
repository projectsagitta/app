import React, { Component } from 'react';
import {    
    StyleSheet,
    Text,
    View
} from 'react-native';
import HeaderButton from '../Components/HeaderButton';
import BluetoothConnection from '../Components/BluetoothConnection';

export default class DeviceSearch extends Component {
    
    render() {
        const { navigate } = this.props.navigation;        
        return(
            <View style={styles.container}>
                <HeaderButton onPress={() => navigate('DrawerOpen')} />
                <Text style={styles.header}>
                    Device Search
                </Text>
                <BluetoothConnection /> 
            </View>
        );        
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        marginVertical: 20,
        color: '#000'
    }
});