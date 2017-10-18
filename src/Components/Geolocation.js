import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class Geolocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
        };
    }

    componentDidMount() {
        return navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message })
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {/*<Button*/}
                    {/*onPress={() => this.loadGeolocation()}*/}
                    {/*title="Load Geolocation"*/}
                {/*/>                */}
                {
                    this.state.latitude ? <View style={styles.textContainer}>
                        <Text>Latitude: {this.state.latitude}</Text>
                        <Text>Longitude: {this.state.longitude}</Text>
                        
                    </View> : null
                } 
                
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0491,
                            longitudeDelta: 0.0375
                        }}
                    >
                        <MapView.Marker
                            draggable
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                            title={'You are here'}
                            pinColor={'#0000ff'}
                        />
                    </MapView>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({    
    textContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapContainer: {
        width: '100%',
        height: '100%'
    },
    map:{
        ...StyleSheet.absoluteFillObject
    }
});

export default Geolocation;