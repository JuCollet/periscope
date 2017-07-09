'use strict';

import React, { Component } from "react";

export default class Photos extends Component {
    
    constructor(props){
        super(props);
    }

    render(){

        return (
            <div className="wrapper PhotoCenter bkg-veryDarkGrey">
                <img className="PhotoBig" src="https://campinglescedres.com/wp-content/uploads/2016/03/dj.jpg" />
            </div>
        );    
    }

}
