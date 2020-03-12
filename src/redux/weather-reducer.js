const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
const SAVE_CITY = 'SAVE_CITY';

const initialState = {
    selectedCity: {
        id: 0,
        name: '',
        state: '',
        country: '',
        coord: {
            lon: 0,
            lat: 0
        }
    },
    savedCities: []
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_CITY:
            return {
                ...state,
                selectedCity: action.city
            };
        case SAVE_CITY:
            let city = state.savedCities.find(el => el.id === state.selectedCity.id);
            if(!city && state.selectedCity.id) {
                return {
                    ...state,
                    savedCities: [...state.savedCities, state.selectedCity]
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};

export const selectedCityCreator = (city) => ( { type: SET_SELECTED_CITY, city: city } );
export const saveCityCreator = () => ( { type: SAVE_CITY } );

export default weatherReducer;