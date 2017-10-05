'use strict';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/Stores/configureStore';
import Root from './src/Root';

const store = configureStore();

// const App = () => (
//     <Provider store={store}>
//         <Root />
//     </Provider>
// )

export default class App extends React.Component {
    render() {
        return (
           <Provider store={store}>
               <Root />
           </Provider>
        );
    }
}
