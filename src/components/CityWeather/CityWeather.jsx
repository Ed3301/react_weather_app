import React, {Component} from "react";
import './CityWeather.css';
import {withRouter} from "react-router-dom";
import {weatherApi} from '../../api/api';
import cities from '../../cities';

class CityWeather extends Component{
    constructor(props) {
        super(props);
        this.state = {
            weather: {
                temperature: '',
                info: '',
                location: {
                    city: '',
                    country: ''
                }
            }
        }
    }

    async componentDidMount() {
        let city = cities.find( el => el.name === this.props.match.params.city);
        if(city) {
            let coords = city.coord;
            let data = await weatherApi.getWeather(coords);
            await this.setState({
                weather: {
                    temperature: data.main.temp,
                    info: data.weather[0].main + ', Wind ' + data.wind.speed + ' meter per second',
                    location: {
                        city: data.name,
                        country: data.sys.country
                    }
                }
            })
        }
    }

    render () {
        return (
            <div className="saved-cities text-center main-color pt-4">
                <h4>Weather in {this.props.match.params.city}</h4>
                <div className='p-4'>
                    <h2 className='temperature'>{ this.state.weather.temperature }&#176;C</h2>
                    <p className='city'>{this.state.weather.location.city + ', ' + this.state.weather.location.country}</p>
                    <p className='info'>{ this.state.weather.info }</p>
                </div>
            </div>
        );
    }
}

export default withRouter(CityWeather);