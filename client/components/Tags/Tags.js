'use strict';

import React from "react";
import _ from "lodash";

export default props => {
    
    if(props.tags !== null && props.tags[0].length > 0){
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