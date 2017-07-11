'use strict';

import React from 'react';

export default function Notification(props){
    return(
        <div className="wrapper-flex-center">
            <h2>Chargement...</h2>
            <div className="loadingBar"><span></span></div>
        </div>
    );
}