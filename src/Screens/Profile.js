import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Profile extends Component {
    
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#FFF',
        },
    };
    
    render() {
        const { navigate, state: {params} } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Text style={styles.header}>
                    This is {params.user}'s profile                    
                </Text>
                <Button
                    onPress={() => navigate('Modal')}
                    title="Open Modal"
                />
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
    },
});