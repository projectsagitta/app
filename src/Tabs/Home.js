import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import HeaderButton from '../Components/HeaderButton';

import { connect } from 'react-redux';
import { fetchData } from '../Actions/index';

class Home extends Component {
    
    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View style={styles.container}>
                <HeaderButton
                    onPress={() => navigate('DrawerOpen')} 
                />
                <Text style={styles.header}>
                    Sagitta is greeting you!
                </Text>

                <Button
                    onPress={() => this.props.fetchData()}
                    title="Load Data"
                />
                <View style={styles.mainContent}>
                    {
                        this.props.appData.isFetching && <Text>Loading</Text>
                    }
                    {
                        this.props.appData.data.length ? (
                            this.props.appData.data.map((person, i) => {
                                return <View key={i} style={styles.mainContentText}>
                                    <Text>Name: {person.name}</Text>
                                    <Text>Age: {person.age}</Text>
                                </View>
                            })
                        ) : null
                    }
                </View>
            </View>
        )
    }
};

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
    mainContent: {
        margin: 10,
        alignItems: 'center'
    },
    mainContentText: {
        alignItems: 'center'
    }
});

function mapStateToProps (state) {
    return {
        appData: state.appData
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

// import React, { Component } from 'react';
// import {
//     Button,
//     StyleSheet,
//     Text,
//     View
// } from 'react-native';
// import HeaderButton from '../Components/HeaderButton';
//
// import { connect } from 'react-redux';
// import { fetchData } from '../Actions/index';
//
// class Home extends Component {
//     constructor(props) {
//        super(props) 
//     }; 
//     render() {
//         const { navigate } = this.props.navigation;
//        
//         return(
//             <View style={styles.container}>
//                 <HeaderButton 
//                     onPress={() => navigate('DrawerOpen')} 
//                 />
//                 <Text style={styles.header}>
//                     Sagitta is greeting you!
//                 </Text>             
//                
//                 <Button
//                     onPress={() => this.props.fetchData()}
//                     title="Load Data"
//                 />
//                 <View style={styles.mainContent}>
//                     {
//                         this.props.appData.isFetching && <Text>Loading</Text>
//                     }
//                     {
//                         this.props.appData.data.length ? (
//                             this.props.appData.data.map((person, i) => {
//                                 return <View key={i} style={mainContentText}>
//                                     <Text>Name: {person.name}</Text>
//                                     <Text>Age: {person.age}</Text>
//                                 </View>
//                             })
//                         ) : null
//                     }
//                 </View>
//             </View>   
//         );
//     }
//    
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFF',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     header: {
//         fontSize: 20,
//         marginVertical: 20, 
//     },
//     button: {
//         height: 60,
//         margin: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#0b7eff'
//     },
//     mainContent: {
//         margin: 10,
//         alignItems: 'center'    
//     },
//     mainContentText: {
//         alignItems: 'center'
//     }
// });
//
// function mapStateToProps (state) {
//     return {
//         appData: state.appData
//     }
// }
//
// function mapDispatchToProps (dispatch) {
//     return {
//         fetchData: () => dispatch(fetchData())
//     }
// }
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Home)