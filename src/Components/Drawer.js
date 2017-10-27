import React, { Component } from 'react';
import {
    Button,
    TouchableHighlight,
    StyleSheet,
    Text,
    View    
} from 'react-native';

export default class Drawer extends Component {
    
    render() {
        const { navigate } = this.props.navigation;        
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Menu
                </Text>
                <View style={styles.listContainer}> 
                    <TouchableHighlight
                        underlayColor='#DDDDDD'
                        onPress={() => navigate('Modal')}
                        style={styles.listItem}
                    >
                        <Text style={styles.listItemText}>Open Modal</Text> 
                    </TouchableHighlight>
                    
                    <TouchableHighlight
                        underlayColor='#DDDDDD'
                        onPress={() => navigate('Profile', { user: 'User' })}
                        style={styles.listItem}
                    >
                        <Text style={styles.listItemText}>OpenProfile</Text> 
                    </TouchableHighlight>                  
                    
                </View>
                <View style={styles.buttonBottom}>
                    <Button
                        onPress={() => navigate('DrawerClose')}
                        title="Close me"
                    />    
                </View>
                
            </View>    
        );        
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        fontSize: 20,
        marginVertical: 20,
        color: '#000',
        paddingHorizontal: 16,
    },
    listContainer: {
        borderColor: '#ccc',
        borderTopWidth: 0.5
    },
    listItem: {
        height: 48,
        paddingHorizontal: 16,
        borderColor: '#ccc',
        borderBottomWidth: 0.5,
        justifyContent: 'center'
    },
    listItemText: {
        color: '#909090',
        fontSize: 16
    },
    buttonBottom: {
        marginTop: 20,
        marginLeft: 16,
        alignSelf: 'flex-start'
    }
});