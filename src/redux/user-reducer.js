const SET_USER_LOCATION = 'SET_USER_LOCATION';
const SET_CURRENT_USER_WEATHER = 'GET_CURRENT_USER_WEATHER';

const initialState = {
    currentUserCoordinates: {
        lat: '',
        lon: ''
    },
    currentUserWeather: {
        temperature: '',
        info: '',
        location: {
            city: '',
            country: ''
        },
    },
    weekWeather: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOCATION:
            return {
                ...state,
                currentUserCoordinates: {lat: action.coords.lat, lon: action.coords.lon}
            };
        case SET_CURRENT_USER_WEATHER:
            return {
                ...state,
                currentUserWeather: {
                    temperature: action.weatherInfo.current.main.temp,
                    info: action.weatherInfo.current.weather[0].main + ', Wind ' + action.weatherInfo.current.wind.speed + ' meter per second',
                    location: {
                        city: action.weatherInfo.current.name,
                        country: action.weatherInfo.current.sys.country
                    }
                },
                weekWeather: action.weatherInfo.week
            };
        default:
            return state;
    }
};

export const setLocationCreator = (coords) => ({type: SET_USER_LOCATION, coords: coords});
export const setWeatherCreator = (weatherInfo) => ({type: SET_CURRENT_USER_WEATHER, weatherInfo: weatherInfo});

export default usersReducer;
