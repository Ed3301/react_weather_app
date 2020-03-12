import React from 'react';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import HeaderContainer from './components/Header/HeaderContainer';
import SavedCities from "./components/SavedCities/SavedCities";
import Tomorrow from "./components/Tomorrow/Tomorrow";
import Week from "./components/Week/Week";
import Today from "./components/Today/Today";
import MainWeatherContainer from "./components/MainWeather/MainWeatherContainer";
import {Provider} from "react-redux";
import store from './redux/store';
import CityWeather from "./components/CityWeather/CityWeather";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <HeaderContainer />
                    </header>
                    <main>
                        <MainWeatherContainer />
                        <div className='app-wrapper-content'>
                            <Route exact path='/' render={() => <SavedCities />}/>
                            <Route exact path='/weather/:city' render={() => <CityWeather />}/>
                            <Route path='/today' render={ () => <Today /> }/>
                            <Route path='/tomorrow' render={ () => <Tomorrow /> }/>
                            <Route path='/week' render={ () => <Week /> }/>
                        </div>
                    </main>
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
