import {combineReducers, createStore} from "redux";
import userReducer from './user-reducer';
import weatherReducer from './weather-reducer';

let reducers = combineReducers({
    userData: userReducer,
    weatherData: weatherReducer
});

const store = createStore(reducers);

export default store;