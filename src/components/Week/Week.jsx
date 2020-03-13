import React, {Component} from "react";
import './Week.css';
import {EventEmitter} from "../../events/eventEmmiter";
import store from "../../redux/store";

class Week extends Component {
    constructor() {
        super();
        this.state = {
            weather: [],
            week: '',
        }
    }

    componentDidMount() {
        EventEmitter.subscribe('weekWeather',  (data) => {
            this.getWeekWeather(data.list);
        });
        if(store.getState().userData.weekWeather.list) {
            this.getWeekWeather(store.getState().userData.weekWeather.list);
        }
    }

    getWeekWeather(data) {
        let curr = new Date();
        let firstDay = curr.getDate();
        let modifyData = [];
        let weather;

        for(let i = 0; i < 7; i++) {
            modifyData.push(data.filter((el) => {
                return parseInt(el.dt_txt.split(' ')[0].slice(-2)) === firstDay + i;
            }));
        }

        modifyData = modifyData.map((el) => {
            if(el.length > 0) {
                let minTemp = el[0].main.temp_min;
                let maxTemp = el[0].main.temp_max;
                let windSpeed = 0;

                for(let i = 0; i < el.length; i++) {
                    windSpeed += el[i].wind.speed;
                    if(el[i].main.temp_min < minTemp) {
                        minTemp = el[i].main.temp_min;
                    }
                    if(el[i].main.temp_max > maxTemp) {
                        maxTemp = el[i].main.temp_max;
                    }
                }
                return {
                    id: el[0].dt,
                    minTemp: minTemp,
                    maxTemp: maxTemp,
                    windSpeed: (windSpeed / el.length).toFixed(1),
                    main: [el[0].weather[0].main, el[el.length - 1].weather[0].main]
                }
            }
            return el;
        }).filter(el => el != false);

        weather = modifyData.map((el) => {
            return <div key={el.id} className="col-1 weather-box">
                <p>{`${el.minTemp.toFixed(1)}\xB0C - ${el.maxTemp.toFixed(1)}\xB0C`}</p>
                <small>{el.main.join(', ')}</small><br/>
                <small>{`Wind ${el.windSpeed} meter per second`}</small>
            </div>
        });

        let lastDay = firstDay + modifyData.length - 1;
        let firstDayOfWeek = new Date(curr.setDate(firstDay)).toString();
        let lastDayOfWeek = new Date(curr.setDate(lastDay)).toString();
        let week = firstDayOfWeek.slice(0, 11) + ' - ' + lastDayOfWeek.slice(0, 11);

        this.setState({ weather, week });
    }

    render() {
        return (
            <div className="week-container text-left main-color p-4">
                <div className='title'>
                    <h3>Week</h3>
                    <p>{ this.state.week }</p>
                </div>
                <div className="row justify-content-sm-around">
                    {this.state.weather.length > 0 &&
                        this.state.weather
                    }
                </div>
            </div>
        );
    }
}

export default Week;