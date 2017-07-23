'use strict';

import React from "react";
import _ from "lodash";

export default props => {
    
    if(Array.isArray(props.tags) && props.tags[0] != undefined && props.tags[0].length > 0){
        return (
            <div className="tags">
                {props.tags.map((tag, index) => {
                    return <span className="tag" key={index}>#{tag}</span>;
                })}
            </div>
        );        
    } else {
        return null;
    }
    
};