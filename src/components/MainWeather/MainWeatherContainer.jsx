import React, {Component} from 'react';
import MainWeather from "./MainWeather";
import {connect} from "react-redux";
import {setLocationCreator, setWeatherCreator} from "../../redux/user-reducer";
import {compose} from "redux";
import {weatherApi} from '../../api/api';
import {EventEmitter} from "../../events/eventEmmiter";

class MainWeatherContainer extends Component {
    componentDidMount() {
        this.props.setCurrentUserLocation();
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevProps.coords) !== JSON.stringify(this.props.coords)) {
            this.props.setCurrentUserWeather(this.props.coords);
        }
    }

    render() {
        return (
            <MainWeather weather={this.props.weather}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        coords: state.userData.currentUserCoordinates,
        weather: state.userData.currentUserWeather
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUserLocation() {
            let getPosition = (position) => {
                dispatch(setLocationCreator({ lat: position.coords.latitude, lon: position.coords.longitude }));
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition);
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        },
        async setCurrentUserWeather (coords) {
            let week = await weatherApi.getweekWeather(coords);
            let current = await weatherApi.getWeather(coords);
            dispatch(setWeatherCreator({current, week}));
            EventEmitter.dispatch('weekWeather', week);
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(MainWeatherContainer)
