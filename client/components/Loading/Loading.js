'use strict';

import React from 'react';

export default function Notification(props){
    return(
        <div className="wrapper-padding wrapper-fullHeight flex-center">
            <h2 className="txt-darkBlueGrey">Chargement...</h2>
            <div className="loadingBar"><span></span></div>
        </div>
    );
}