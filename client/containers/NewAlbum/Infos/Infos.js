import React from "react";
import dropPhoto from "./app_dropPhotos.png";

export default function(){
    return (
        <div>
            <h3>Envoyez vos photos</h3>
            <p>Dès que vous aurez créé un album, vous serez redirigé(e) vers la gallerie où il vous suffira de glisser-déposer vos fichiers sur la carte de l'album fraichement créé.</p>
            <img src={dropPhoto} width="200" alt="glissez-déposez vos images"/>
            <h3 className="margin-md-top">50 fichiers à la fois</h3>
            <p>Vous pouvez envoyer jusqu'à <strong>50 fichiers</strong> PNG ou JPEG simulatanément !</p>
            <p>Pendant leur transfert, vous pouvez utiliser Periscope tout à fait normalement, mais veillez à <strong>ne pas quitter l'application, ni rafraichir la page </strong>dans votre navigateur. Une fois traitées par le serveur, vos images seront automatiquement ajoutée à votre bibliothèque.</p>
            <small>Cette application tourne sur un serveur de petite capacité, il ne sait donc traiter plus de 50 fichiers simultanément. :(</small>
        </div>
    );
}