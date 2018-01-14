import { combineReducers } from 'redux';
import CoordReducer from './CoordReducer';

const allReducers = {
    coord: CoordReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;