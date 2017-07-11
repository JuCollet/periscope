'use strict';

import React from "react";
import _ from "lodash";

export default props => {
    
    return (
        <div>
            {props.tags.map((tag, index) => {
                return <span className="tag" key={index}>#{tag}</span>;
            })}
        </div>
    );
    
};