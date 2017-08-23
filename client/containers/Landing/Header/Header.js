import React from "react";

export default props => {
    return(
        <header>
            <span className="header-title">Periscope</span>
            <span className="header-baseline">Photothèque en ligne</span>
            <a href="/login"><span className="header-link">Se connecter</span></a>
        </header>
    );
};