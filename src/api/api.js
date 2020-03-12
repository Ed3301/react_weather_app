import * as axios from "axios";

const DEFAULT_API_URL = process.env.API_URL || 'https://api.openweathermap.org/data/2.5/weather';
const WEEK_API_URL = process.env.WEEK_API_URL || 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = process.env.API_KEY || '156a2c5b9041b784eccada8f35bb12cd';
const UNITS = 'metric';

// const instance = axios.create({
//     withCredentials: false,
//     baseURL: process.env.API_URL || 'https://api.openweathermap.org/data/2.5/weather',
//     headers: {
//         'appid': '156a2c5b9041b784eccada8f35bb12cd'
//     }
// });


export const weatherApi = {
    getWeather(coords) {
        return axios.get(`${DEFAULT_API_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=${UNITS}`)
            .then((response) => {
                return response.data;
            })
            .catch(err => alert(err));
    },
    getweekWeather(coords) {
        return axios.get(`${WEEK_API_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=${UNITS}`)
            .then((response) => {
                return response.data;
            })
            .catch(err => alert(err));
    }
};
