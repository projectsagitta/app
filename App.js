'use strict';

import React from 'react';
import store from './src/Store';
import { Provider } from 'react-redux';
import Root from './src/Root';


export default class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
           <Provider store={store}>
               <Root />
           </Provider>
        );
    }
}


