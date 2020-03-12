import React, {useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import './Header.css';
import cities from "../../cities";

const Header = (props) => {

    const inputRef = useRef(null);
    const [citiesList, changeCitiesList] = useState([]);

    const findMatchedCities = (e) => {
        let matchedCities = cities.filter( (el) => {
            let name = el.name.toLowerCase();
            return name.includes(e.target.value.toLowerCase());
        });

        let newList = matchedCities.map( (el) => {
            return (
                <li onClick={ () => { selectCity(el) } } key={el.id} className='list-group-item'>{el.name}</li>
            );
        });
        changeCitiesList(newList);
    };

    const selectCity = (obj) => {
        inputRef.current.value = obj.name;
        props.selectCity(obj);
        changeCitiesList([]);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/today'>
                            Today
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/tomorrow'>
                            Tomorrow
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/week'>
                            Week
                        </NavLink>
                    </li>
                </ul>
                <div>
                    <div className="d-flex">
                        <button onClick={ props.saveCity } className='btn float-right main-color'>+</button>
                        <input ref={inputRef}
                               onChange={ findMatchedCities }
                               className="form-control mr-sm-2"
                               type="search"
                               placeholder="Find city..."
                               aria-label="Search"
                        />
                    </div>
                    { citiesList.length > 0 &&
                        <div>
                            <ul className='list-group position-absolute'>
                                { citiesList }
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Header;