import React, {Component} from "react";
import './SavedCities.css';
import store from "../../redux/store";
import {EventEmitter} from '../../events/eventEmmiter';
import {NavLink} from "react-router-dom";

class SavedCities extends Component {
    constructor() {
        super();
        this.state = {
            savedCities: []
        };
    }

    componentDidMount() {
        this.renderSavedCities();
        EventEmitter.subscribe('addedCity', () => { this.renderSavedCities() });
    }

    componentWillUnmount() {
        EventEmitter.unSubscribe('addedCity', () => { this.renderSavedCities() });
    }

    renderSavedCities() {
        let html = store.getState().weatherData.savedCities.map((el) => {
            return <div key={el.id} className="city-item col-2 row justify-content-center align-items-center">
                <NavLink to={`weather/${el.name}`} >
                    {el.name}
                </NavLink>
            </div>
        });
        this.setState({
            savedCities: html
        });
    }

    render() {
        return (
            <div className="saved-cities text-center main-color pt-4 overflow-hidden">
                <h4>Saved cities</h4>
                <div className='city-boxes mt-4'>
                    { this.state.savedCities.length > 0 &&
                        <div className="row justify-content-sm-around align-items-center">
                            {this.state.savedCities}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SavedCities;