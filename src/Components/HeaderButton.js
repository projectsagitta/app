import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HeaderButton extends Component {
    
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        icon: PropTypes.string.isRequired,
    };
    
    static defaultProps = {
      icon: 'md-menu',  
    };
    
    render() {
        return(
            <View style={styles.container}>
                <Icon.Button
                    name={this.props.icon}
                    size={30}
                    color="#4F8EF7"
                    backgroundColor="#FFF"
                    onPress={this.props.onPress}
                    style={styles.icon}
                />                            
            </View>            
        );        
    }    
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 0,
        paddingLeft: 10
    }
});