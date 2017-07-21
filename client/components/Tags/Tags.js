'use strict';

import React from "react";
import _ from "lodash";

export default props => {
    
    return (
        <div className="tags">
            {props.tags.map((tag, index) => {
                return <span className="tag" key={index}>#{tag}</span>;
            })}
        </div>
    );
    
};