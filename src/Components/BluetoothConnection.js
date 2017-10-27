import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
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
            <View>
                <TouchableHighlight style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={this.startDiscovery}>
                    <Text>Discover devices ({ this.state.discovering ? 'on' : 'off' })</Text>
                </TouchableHighlight>
                <View>
                    {
                        this.state.unpairedDevices.length ? (
                            this.state.unpairedDevices.map((device, i) => {
                                return (
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold' }}>{device.name}</Text>
                                        <Text>{`<${device.id}>`}</Text>
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