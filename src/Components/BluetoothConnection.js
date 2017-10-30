import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    Platform
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from '@remobile/react-native-toast';

export default class BluetoothConnection extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            isEnabled: false,
            discovering: false,
            devices: [],
            unpairedDevices: [],
            connected: false
        };
        this.enableBluetooth = this.enableBluetooth.bind(this);
        this.startDiscovery = this.startDiscovery.bind(this);
        this.cancelDiscovery = this.cancelDiscovery.bind(this);
    }
    
    componentDidMount() {
        BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'));
        BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'));
        BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));        
    }

    /**
     * [android]
     * enable bluetooth on device
     */
    enableBluetooth () {
        return BluetoothSerial.enable()
            .then((res) => {
                this.setState({ isEnabled: true });
            })
            .catch((err) => Toast.showShortBottom(err.message))
    }
    
    /**
     * [android]
     * Discover unpaired devices, works only in android
     */        
    startDiscovery() {
        this.enableBluetooth()
            .then((res) => {
                if (this.state.discovering) {
                    return false
                } else {
                    this.setState({ discovering: true });
                    BluetoothSerial.discoverUnpairedDevices()
                        .then((unpairedDevices) => {
                            this.setState({ unpairedDevices, discovering: false });
                            console.log(this.state);
                        })
                        .catch((err) => console.log(err.message))
                }    
            })
    }

    /**
     * [android]
     * Discover unpaired devices, works only in android
     */
    cancelDiscovery () {
        if (this.state.discovering) {
            BluetoothSerial.cancelDiscovery()
                .then(() => {
                    this.setState({ discovering: false })
                })
                .catch((err) => Toast.showShortBottom(err.message))
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonBottom} >
                    <Button
                        title={'Discover'}
                        onPress={this.startDiscovery} />
                </View>                
                {
                    this.state.discovering 
                    ? ( <View style={styles.activityContainer}>
                            <ActivityIndicator
                                style={styles.activityIcon}
                                size={60} />
                            <Button                                
                                title='Cancel Discovery'
                                onPress={this.cancelDiscovery} />
                        </View> ) : null                            
                }
                
                <View>
                    {
                        this.state.unpairedDevices.length ? (
                            this.state.unpairedDevices.map((device, i) => {
                                return (
                                    <View
                                        key={`id_${i}`}
                                        style={styles.devicesListItem}>
                                        <Text style={styles.devicesName}>{device.name}</Text>
                                        <Text style={styles.devicesId}>{`<${device.id}>`}</Text>
                                    </View>
                                )
                            }) 
                        ) : null
                    }
                    
                </View>
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
   container: {
       flex: 1 
   },
   buttonBottom: {
       position: 'absolute', 
       bottom: 10, 
       left: 10, 
       right: 10
   },
   activityContainer: {
       flex: 1, 
       alignItems: 'center', 
       justifyContent: 'center'
   },
   activityIcon: {
       marginBottom: 15
   },
   devicesListItem: {
       justifyContent: 'space-between', 
       flexDirection: 'row', 
       alignItems: 'center', 
       paddingHorizontal: 15, 
       marginVertical: 15
   },
   devicesName: {
       fontWeight: 'bold', 
       color: '#000'
   },
   devicesId: {
       color:'#000'
   } 
});