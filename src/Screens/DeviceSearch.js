import React, { Component } from 'react';
import {    
    StyleSheet,
    Text,
    View
} from 'react-native';
import HeaderButton from '../Components/HeaderButton';
import BluetoothConnection from '../Components/BluetoothConnection';
import DeviceSearchModal from '../Components/DeviceSearchModal';

export default class DeviceSearch extends Component {
    
    render() {
        const { navigate } = this.props.navigation;        
        return(
            <View style={styles.container}>
                <HeaderButton onPress={() => navigate('DrawerOpen')} />
                <View style={{alignContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.header}>
                        Device Search
                    </Text>
                </View>                
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