import { combineReducers } from 'redux';
import LatReducer from './LatReducer';
import LngReducer from './LngReducer';

const allReducers = {
    currentLat: LatReducer,
    currentLng: LngReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;