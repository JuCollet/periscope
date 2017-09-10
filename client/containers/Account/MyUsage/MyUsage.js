import React from "react";
import { connect } from "react-redux";

import VolumeGauge from "../../../components/VolumeGauge/VolumeGauge";
import Loading from "../../../components/Loading/Loading";

class MyUsage extends React.Component {

    render(){

        const { infos } = this.props;
        const usedVolumePercentage = Math.round((infos.usedVolume/infos.volume)*100);
        
        if(this.props.isFetching){
            return <Loading />;
        }
        
        return (
            <div>
                <h3>Bonjour&nbsp;{infos.name},</h3>
                <p>Tu as déjà utilisé {infos.usedVolume ? Math.round(infos.usedVolume/1048576) : 0}Mo, soit <b>{usedVolumePercentage ? usedVolumePercentage : 0}%</b> de ton volume de <b>{infos.volume/1073741824}Go.</b></p>
                <VolumeGauge volume={infos.volume ? infos.volume : 0 } usedVolume={infos.usedVolume ? infos.usedVolume : 0}/>
                <h3 className="margin-md-top">{infos.numberOfAlbums ? infos.numberOfAlbums : 0} album{infos.numberOfAlbums && infos.numberOfAlbums > 1 ? "s" : null}, {infos.numberOfPhotos ? infos.numberOfPhotos : 0} photo{infos.numberOfPhotos && infos.numberOfPhotos > 1 ? "s":null}</h3>
                <p className="margin-md-bottom">Tu as {infos.numberOfPhotos ? infos.numberOfPhotos : 0} photo{infos.numberOfPhotos && infos.numberOfPhotos > 1 ? "s":null}, réparties dans {infos.numberOfAlbums ? infos.numberOfAlbums : 0} album{infos.numberOfAlbums && infos.numberOfAlbums > 1 ? "s" : null}.</p>
                <hr/>
                <h3 className="margin-md-top">Besoin de plus d'espace ?</h3>
                <p>Achetez de l'espace supplémentaire pour sauvegarder plus de photos ! Heheheh c'est trop coooooool</p>
            </div>
        );
    }
}

function mapStateTopProps(state){
    return {
        isFetching : state.fetching.isFetching
    };
}

export default connect(mapStateTopProps)(MyUsage);