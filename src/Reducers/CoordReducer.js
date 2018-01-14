
import  { UPDATE_COORD }  from '../actions/CoordActions';

const initialState = {
    lat: 0,
    lng: 0
};

export default function(state=initialState, action) {
    switch (action.type) {
        case UPDATE_COORD: {
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
            }
        }
        default:
            return state;
    }

}