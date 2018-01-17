import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from '@remobile/react-native-toast';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class BluetoothConnection extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            isEnabled: false,
            discovering: false,
            devices: [],
            unpairedDevices: [],
            connecting: false,
            connected: false,
            lat: this.props.lat,
            lng: this.props.lng,
            dataFromDevice: [],
            deviceReady: false,
            deviceOn: false,
            currentDate: null
        };
        this.enableBluetooth = this.enableBluetooth.bind(this);
        this.startDiscovery = this.startDiscovery.bind(this);
        this.write = this.write.bind(this);
        this.cancelDiscovery = this.cancelDiscovery.bind(this);
        this.switchDeviceOn = this.switchDeviceOn.bind(this);
        this.switchDeviceOff = this.switchDeviceOff.bind(this);
    }
    
    componentDidMount() {
        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list()
        ]).then((values) => {
            const [ isEnabled, devices ] = values;
            this.setState({ isEnabled, devices })
        });
        
        BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'));
        BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'));
        BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));
        BluetoothSerial.on('connectionLost', () => {
            if (this.state.device) {
                Toast.showShortBottom(`Connection to device ${this.state.device.name} has been lost`)
            }
            this.setState({ connected: false })
        });
        BluetoothSerial.on('read', (data) => { console.log('without delimiter', data, data.data, typeof data); });
        BluetoothSerial.withDelimiter('\n').then((res)=>{
            console.log("delimiter setup", res);
            BluetoothSerial.on('read',(data)=>{
                console.log('read',data, data.data, typeof data);
                if (typeof data.data === 'string'){
                    let dataTrimmed =  data.data.replace(/(\r\n|\n|\r)/gm,"");
                    if (dataTrimmed === 'success'){                        
                        this.setState({deviceReady: true});
                    }
                }                
                const dataArray = this.state.dataFromDevice;
                dataArray.push(data.data);
                this.setState({dataFromDevice: dataArray});
            })
        });
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
                        })
                        .catch((err) => console.log(err.message))
                }    
            })
    }

    /**
     * [android]
     * Cancel discovery
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

    /**
     * [android]
     * Pair device
     */
    pairDevice(device) {
        BluetoothSerial.pairDevice(device.id)
            .then((paired) => {
                if (paired) {
                    Toast.showShortBottom(`Device ${device.name} paired successfully`);
                    const devices = this.state.devices;
                    devices.push(device);
                    this.setState({ devices, unpairedDevices: this.state.unpairedDevices.filter((d) => d.id !== device.id) });
                } else {
                    Toast.showShortBottom(`Device ${device.name} pairing failed`)
                }
            })
            .catch((err) => Toast.showShortBottom(err.message))
    }

    /**
     * Connect to bluetooth device by id
     * @param  {Object} device
     */
    connectDevice(device) {
        this.setState({ connecting: true });
        BluetoothSerial.connect(device.id)
            .then((res) => {
                Toast.showShortBottom(`Connected to device ${device.name}`);
                this.setState({ device, connected: true, connecting: false }, () => {
                    console.log(this.state);
                });
                let currentDate = moment().format('DDMMYYYYHHmm');                
                console.log(currentDate);
                this.setState({currentDate: currentDate}, () => {
                    const message = `filename ${currentDate}.csv\r\n`;
                    this.write(message);
                });
                
                const deviceObj = this;
                let lat = this.state.lat;
                let lng = this.state.lng;
                setTimeout(function(){
                    const coord = `coord ${lat},${lng}\r\n`;
                    deviceObj.write(coord);
                }, 0);
                         
                           
            })
            .catch((err) => Toast.showShortBottom(err.message))
    }
    /**
     * Start measuring
     * @param {String} message
     */
    write(message) {        
        if (!this.state.connected) {
            Toast.showShortBottom('You must connect to device first')
        }
        BluetoothSerial.write(message)
            .then((res) => {
                Toast.showShortBottom('Successfully wrote to device');
                this.setState({ connected: true })
            })
            .catch((err) => Toast.showShortBottom(err.message))
    }
    switchDeviceOn = () => {        
        this.write('mode 1\r\n');
        this.setState({deviceOn: true});
    }
    switchDeviceOff = () => {
        this.write('mode 0\r\n');
        this.setState({deviceOn: false}, () => {
            const message = `get ${this.state.currentDate}.csv\r\n`;
            this.write(message);
        });
    }
    render() {
        // console.log(this.state);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        { !(this.state.unpairedDevices.length || this.state.devices.length) ? (
                            <View style={styles.devicesMsg}>
                                <Text style={styles.devicesListEmpty}>No devices found yet.</Text>
                                <Text style={styles.devicesListEmpty}>Press "discover" to start searching.</Text>
                            </View>
                        ) : null }
                    </View>
                    <View>
                        {
                            (this.state.unpairedDevices.length) ? (
                                this.state.unpairedDevices.map((device, i) => {
                                    return (
                                        <View
                                            key={`id_${i}`}
                                            style={styles.devicesListItem}>
                                            <View>
                                                <Text style={styles.devicesName}>{device.name}</Text>
                                                <Text style={styles.devicesId}>{`<${device.id}>`}</Text>
                                            </View>                                        
                                            <Button
                                                title='Pair'
                                                onPress={this.pairDevice.bind(this, device)} />
                                        </View>
                                    )
                                }) 
                            ) : null
                        }                    
                    </View>
                    <View>
                        {
                            this.state.devices ? (
                                this.state.devices.map((device, i) => {
                                    return (
                                        <View
                                            key={`id_${i}`}
                                            style={styles.devicesListItem}>
                                            <View>
                                                <Text style={styles.devicesName}>{device.name}</Text>
                                                <Text style={styles.devicesId}>{`<${device.id}>`}</Text>
                                            </View>
                                            {
                                                (this.state.device && this.state.device.id === device.id) ? <Text style={{color: '#00aa00'}}>
                                                    Connected
                                                </Text> : <Button
                                                    title='Connect'
                                                    onPress={this.connectDevice.bind(this, device)} />
                                            }                                        
                                        </View>
                                    )
                                }) 
                            ) : null
                        }                    
                    </View>
                    <View style={{marginRight: 10, marginLeft: 10}}>
                        {
                            this.state.deviceReady && !this.state.deviceOn ? (                                
                                <Button
                                    title='Start'
                                    onPress={this.switchDeviceOn}                                     
                                    />
                            ) : null
                        }
                        {
                            this.state.deviceReady && this.state.deviceOn ? (                                
                                <Button
                                    title='Finish'
                                    onPress={this.switchDeviceOff}                                     
                                    />
                            ) : null
                        }
                        
                    </View>
                    <View style={styles.dataList}>
                        {
                            this.state.dataFromDevice.length > 0 && <Text 
                                style={styles.dataListHeading}>Received data:</Text>
                        }                    
                        {  this.state.dataFromDevice ? (                            
                            this.state.dataFromDevice.map((data, i) => {
                                    return (                                    
                                        <View key={`id_${i}`} style={{marginTop: 5}}>
                                            <Text style={{color: "#000", fontSize: 16}}>{data}</Text>
                                        </View>    
                                    )
                                }) 
                            )  : null                        
                        }
                    </View>
                </ScrollView>
                
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
                
                
                <View style={styles.buttonBottom} >
                    <Button
                        title={'Discover'}
                        onPress={this.startDiscovery} />
                </View>
            </View>
        )
        
    }
}

BluetoothConnection.propTypes = {
    lat: PropTypes.any.isRequired,
    lng: PropTypes.any.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        lat: state.currentLat.lat,
        lng: state.currentLng.lng
    };
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       paddingBottom: 60
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
       justifyContent: 'center',
       ...StyleSheet.absoluteFillObject
       
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
   },
   devicesListEmpty: {
       textAlign: 'center', 
       color: '#000', 
       fontSize: 16
   },
   devicesMsg: {
       padding: 20
   },
   dataList: {
       marginTop: 20, 
       paddingHorizontal: 15
   },
   dataListHeading: {
       fontWeight: 'bold', 
       color: '#4F8EF7', 
       fontSize: 16
   } 
   
});

export default connect(mapStateToProps)(BluetoothConnection);