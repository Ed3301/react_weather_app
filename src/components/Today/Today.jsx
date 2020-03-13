import React, {Component} from "react";
import './Today.css';
import {EventEmitter} from "../../events/eventEmmiter";
import store from "../../redux/store";
import GoogleMap from "../GoogleMap/GoogleMap";

class Today extends Component {
    constructor() {
        super();
        this.state = {
            today: '',
            weather: [],
            city: {}
        }
    }

    componentDidMount() {
        EventEmitter.subscribe('weekWeather',  (data) => {
            this.getTodaysWeather(data);
        });
        if(store.getState().userData.weekWeather.list) {
            this.getTodaysWeather(store.getState().userData.weekWeather);
        }
    }

    getTodaysWeather(data) {
        let hours = ['12:00', '15:00', '18:00', '21:00'];
        let today = new Date(new Date());
        today.setDate(today.getDate());
        let weather = data.list.filter( (el) => {
            let hour = el.dt_txt.split(' ')[1].slice(0, 5);
            let date = el.dt_txt.split(' ')[0];
            return hours.includes(hour) && parseInt(date.slice(-2)) === new Date().getDate();
        });
        weather = weather.map( (el) => {
            let hour = el.dt_txt.split(' ')[1].slice(0, 5);
            return <tr key={el.dt}>
                <td>{ hour }</td>
                <td>{`${el.main.temp}\xB0C, ${el.weather[0].main}, Wind - ${el.wind.speed} meter per second`}</td>
            </tr>
        });
        this.setState({
            weather,
            today: today.toString().slice(3, 11),
            city: data.city
        });
    }

    render() {
        return (
            <div className="container today-weather-container main-color pt-4">
                <div className="row justify-content-sm-around">
                    <div className="col-4 text-left">
                        <h2>Today</h2>
                        <p>{ this.state.today }</p>
                        <br/>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Time</th>
                                    <th scope="col">Weather</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.weather.length > 0 &&
                                    this.state.weather
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6 p-0 google-map-container">
                        {this.state.city.id &&
                            <GoogleMap city={this.state.city} weather={this.state.weather}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Today;