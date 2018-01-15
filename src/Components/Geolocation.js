import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {updateLat, updateLng} from '../Actions/CoordActions';
import { connect } from 'react-redux';
import store from '../Store';

import { Button, View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';



class Geolocation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng,
            error: null,
        };
        console.log(this.state);
    }

    loadGeolocation() {
        return navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    error: null,
                });
                this.props.updateLat(position.coords.latitude);
                this.props.updateLng(position.coords.longitude);
                    
                               
            },
            (error) => this.setState({ error: error.message })
        ); 
    }
    
    updateCoordinates(e) {
        this.setState({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude
        });
        this.props.updateLat(e.nativeEvent.coordinate.latitude);
        this.props.updateLng(e.nativeEvent.coordinate.longitude);        
        
    }
    
    componentDidMount() {
        this.loadGeolocation();
    }

    render() {
        console.log(store.getState());
        return (
            <View>        
                
                <View style={styles.mapContainer}>
                    <MapView                        
                        style={styles.map}
                        region={{
                            latitude: this.state.lat,
                            longitude: this.state.lng,
                            latitudeDelta: 0.0491,
                            longitudeDelta: 0.0375
                        }}
                    >
                        <MapView.Marker
                            draggable
                            coordinate={{
                                latitude: this.state.lat,
                                longitude: this.state.lng
                            }}
                            pinColor={'#4F8EF7'}
                            onDragEnd={(e) => this.updateCoordinates(e)}
                        />
                    </MapView>
                </View>
                
                {
                    this.state.latitude ? <View style={styles.textContainer}>
                        <Text style={styles.textContent}>Latitude: {this.state.lat}</Text>
                        <Text style={styles.textContent}>Longitude: {this.state.lng}</Text>
                    </View> : null
                }

                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                
                <View style={styles.buttonContainer}>                   
                    <Icon.Button
                        name={'md-locate'}
                        size={30}
                        backgroundColor="#FFF"
                        color={'#4F8EF7'}
                        onPress={() => this.loadGeolocation()}
                        style={{paddingRight: 0}}
                    />
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({    
    textContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'        
    },
    textContent: {
        color: '#000',
        textAlign: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        width: '100%',
        height: '100%'
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    buttonContainer: {
       position: 'absolute',
       right: 10,
       bottom: 60,
       justifyContent: 'center',
       alignItems: 'center', 
    }
});

Geolocation.propTypes = {
    lat: PropTypes.any.isRequired,
    lng: PropTypes.any.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        lat: state.currentLat.lat,
        lng: state.currentLng.lng
    };
}

const mapDispatchToProps = {
    updateLat,
    updateLng
};

export default connect(mapStateToProps, mapDispatchToProps)(Geolocation);
