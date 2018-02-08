
import  { UPDATE_LNG }  from '../Actions/CoordActions';

const initialState = {
    lng: 180
};

export default function(state=initialState, action) {
    switch (action.type) {
        case UPDATE_LNG: {
            return {
                ...state,
                lng: action.lng
            }
        }
        default:
            return state;
    }

}