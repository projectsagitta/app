import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import HeaderButton from '../Components/HeaderButton';

export default class Home extends Component {
    
    render() {
        const { navigate } = this.props.navigation;
        
        return(
            <View style={styles.container}>
                <HeaderButton 
                    onPress={() => navigate('DrawerOpen')} 
                />
                <Text style={styles.header}>
                    What's up everybody!
                </Text>
                <View style={styles.button}> 
                    <Button
                        onPress={() => navigate('Settings')}
                        title="Open Settings Tab"
                    />    
                </View>                
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
    },
    button: {
        marginBottom: 20, 
    }
});