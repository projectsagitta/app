import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

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
        this.discoverUnpairedDevices = this.discoverUnpairedDevices.bind(this);
        this.enableBluetooth = this.enableBluetooth.bind(this);
        this.startDiscovering = this.startDiscovering.bind(this);
    }
    
    componentDidMount() {
        BluetoothSerial.on('bluetoothEnabled', () => console.log('Bluetooth enabled'));
        BluetoothSerial.on('bluetoothDisabled', () => console.log('Bluetooth disabled'));
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
                console.log('Bluetooth enabled');
            })
            .catch((err) => console.log(err.message))
    }
    
    /**
     * [android]
     * Discover unpaired devices, works only in android
     */
    discoverUnpairedDevices() {
        
    }
    
    startDiscovering() {
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
    
    render() {
        return (
            <View>
                <TouchableHighlight style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={this.startDiscovering}>
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