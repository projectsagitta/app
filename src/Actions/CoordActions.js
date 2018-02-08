export const UPDATE_LAT = 'UPDATE_LAT';
export const UPDATE_LNG = 'UPDATE_LNG';

export function updateLat(lat) {
    return {
        type: UPDATE_LAT,
        lat 
    }
}


export function updateLng(lng) {
    return {
        type: UPDATE_LNG,       
        lng    
    }
}



