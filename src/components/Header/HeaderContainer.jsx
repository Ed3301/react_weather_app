import React, {Component} from "react";
import {selectedCityCreator, saveCityCreator} from '../../redux/weather-reducer';
import {compose} from "redux";
import {connect} from "react-redux";
import Header from "./Header";
import {EventEmitter} from '../../events/eventEmmiter';

class HeaderContainer extends Component {
    render() {
        return (
            <div>
                <Header selectCity={ this.props.selectCity.bind(this) } saveCity={ this.props.saveCity.bind(this) } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedCity: state.weatherData.selectedCity,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectCity: (obj) => {
            dispatch(selectedCityCreator(obj));
        },
        saveCity() {
            dispatch(saveCityCreator());
            EventEmitter.dispatch('addedCity', []);
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(HeaderContainer);