import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../Constants/index';
import { put, takeEvery } from 'redux-saga/effects';
import getPeople from '../Api/index';

const fetchData = function* fetchData (action) {
    try {
        const data = yield getPeople();
        
        yield put({ type: FETCHING_DATA_SUCCESS, data })
    } catch (e) {
        yield put({ type: FETCHING_DATA_FAILURE })
    }
};

const dataSaga = function* dataSaga () {
    yield takeEvery(FETCHING_DATA, fetchData)
};

export default dataSaga;