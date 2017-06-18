import React, { Component } from "react";
import PropTypes from 'prop-types';

import Header from "../../components/Header/Header";
import Albums from "../../components/Albums/Albums";
import albumsMock from "../../mock/albums";

export default class Gallery extends Component {
    
    render () {
        return (
            <div className="container">
                <Header />
                <Albums albums={albumsMock}/>
            </div>
        );
    }
}