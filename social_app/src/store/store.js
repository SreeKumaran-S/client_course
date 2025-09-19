import {legacy_createStore as createStore, combineReducers} from 'redux';
import signupReducer from '../reducer/signupReducer';

let rootReducer = combineReducers({
        signup : signupReducer
    });

let store = createStore(rootReducer);

export default store;