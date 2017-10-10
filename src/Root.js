import React from 'react';
import {
    DrawerNavigator,
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Tabs/Home';
import Settings from './Tabs/Settings';
import Profile from './Screens/Profile';
import Modal from './Screens/Modal';
import Drawer from './Components/Drawer';

// Stack navigation for Settings and Profile screens
const SettingsTab = StackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            header: null,
            headerBackTitle: 'Back',
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.user}'s Profile`,
        }),
    },
}, {
    headerMode: 'screen',
});

// Tab navigation for Home and Settings screens
const TabNavigation = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, focused }) => <Icon
                name={focused ? 'ios-home' : 'ios-home-outline'}
                size={26}
                style={{ color: tintColor }}
            />
        },
    },
    Settings: {
        screen: SettingsTab,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor, focused }) => <Icon
                name={focused ? 'ios-settings' : 'ios-settings-outline'}
                size={26}
                style={{ color: tintColor }}
            />
        },
    },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true
    }
});

// Wrap tab navigation into drawer navigation
const TabsWithDrawerNavigation = DrawerNavigator({
    Tabs: {
        screen: TabNavigation,
    }
}, {
    // Register custom drawer component
    contentComponent: props => <Drawer {...props} />
});

// Stack together drawer with tabs and modal navigation
// to call Modal screen from any other screen
const Root = StackNavigator({
    TabsWithDrawer: {
        screen: TabsWithDrawerNavigation,
    },
    Modal: {
        screen: Modal
    },
}, {
    // In modal mode screen slides up from the bottom
    mode: 'modal',
    headerMode: 'none',
});

export default Root;


