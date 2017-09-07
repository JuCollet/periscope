import React from "react";
import VolumeGauge from "../../../components/VolumeGauge/VolumeGauge";

export default class MyUsage extends React.Component {
    
    render(){

        const infos = this.props.infos;
        const usedVolumePercentage = Math.round((infos.usedVolume/infos.volume)*100);

        return (
            <div>
                <h3>Bonjour&nbsp;{infos.name},</h3>
                <p>Tu as déjà utilisé {Math.round(infos.usedVolume/1048576)}Mo, soit <b>{usedVolumePercentage}%</b> de ton volume de <b>{infos.volume/1073741824}Go.</b></p>
                <VolumeGauge volume={infos.volume} usedVolume={infos.usedVolume}/>
                <h3 className="margin-md-top">{infos.numberOfAlbums} albums, {infos.numberOfPhotos} photos</h3>
                <p className="margin-md-bottom">Tu as {infos.numberOfPhotos} photos, réparties dans {infos.numberOfAlbums} albums.</p>
                <hr/>
                <h3 className="margin-md-top">Besoin de plus d'espace ?</h3>
                <p>Achetez de l'espace supplémentaire pour sauvegarder plus de photos ! Heheheh c'est trop coooooool</p>
            </div>
        );
    }

}