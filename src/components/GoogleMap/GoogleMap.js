import React, {Component} from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: this.props.city,
            marks: [this.props.city.coord],
            initialCenter: {
                lat: this.props.city.coord.lat,
                lng: this.props.city.coord.lon
            }
        }
    }

    displayMarkers() {
        return this.state.marks.map((mark, index) => {
            return (
                <Marker data-toggle="modal"
                        data-target="#weatherModal"
                        key={index}
                        id={index}
                        position={{
                            lat: mark.lat,
                            lng: mark.lon
                        }}
                        onClick={ () => {this.toggleModal('block')} }
                />
            )
        })
    }

    toggleModal(prop) {
        let modal = document.getElementById('weatherModal');
        if(modal) {
            modal.style.display = prop;
        }
    }

    render() {
        return <>
            <Map
                google={this.props.google}
                zoom={8}
                initialCenter={ this.state.initialCenter }
            >
                { this.displayMarkers() }
            </Map>
            <div className="modal" id="weatherModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Weather in {this.state.city.name}</h5>
                            <button onClick={ () => {this.toggleModal('none')}} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">Time</th>
                                        <th scope="col">Weather</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.props.weather }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBjKtMl2tLbMtcKYEdqxLIs1CBURBKICXs'
})(MapContainer);