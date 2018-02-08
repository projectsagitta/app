
import  { UPDATE_LAT }  from '../Actions/CoordActions';

const initialState = {
    lat: 90
};

export default function(state=initialState, action) {    
    switch (action.type) {
        case UPDATE_LAT: {
            return {
                ...state,
                lat: action.lat
            }
        }
        default:
            return state;
    }

}