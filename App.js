'use strict';

import React from 'react';
import { Provider } from 'react-redux';

import store from './src/store.js';
import Root from './src/Root';



export default class App extends React.Component {
    render() {
        return (
           <Provider store={store}>
               <Root />
           </Provider>
        );
    }
}


