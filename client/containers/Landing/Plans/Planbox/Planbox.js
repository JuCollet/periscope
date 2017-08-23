import React from "react";
import { Link } from"react-router-dom";

export default props => {
    return(
        <div className="planbox">
            <div className="planbox-image">
                <img src={props.img} />
            </div>
            <div className="planbox-body">
                <h3 className="txt-white">{props.name}</h3>
                <hr/>
                <p><b>{props.storage}</b> de stockage</p>
                <hr/>
                <p><b>{props.users} </b>{props.usersText}</p>        
                <Link to={`/checkout/${props.plan}`}><span className={`planbox-cta bkg-${props.color}`}>{props.price}</span></Link>
            </div>
        </div>
    )
}