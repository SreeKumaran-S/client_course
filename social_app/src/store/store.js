import {legacy_createStore as createStore, combineReducers} from 'redux';
import usersReducer from '../reducer/usersReducer';

let rootReducer = combineReducers({
        usersState: usersReducer
    });

let store = createStore(rootReducer);

export default store;