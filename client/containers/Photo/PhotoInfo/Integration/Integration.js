import React from "react";

export default class Integration extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    toClipboard(e, el){
        e.preventDefault();
        el.select();
        document.execCommand('copy');
        const elBackground = el.style.backgroundColor;
        const elColor = el.style.color;
        el.style.backgroundColor = "#4EE898";
        el.style.color = "white";
        setTimeout(_=>{
            el.style.backgroundColor = elBackground;
            el.style.color = elColor;
        }, 1000);
    }
    
    render(){
        return(
            <div>
                <h3>Intégration</h3>
                <h4 className="margin-sm-bottom margin-lg-top">Lien de l'image originale</h4>
                <input defaultValue={this.props.photo.original} ref={el => this.input1 = el} className="small-input margin-sm-bottom"></input>
                <button className="button button-small button-white button-hover-green" onClick={e=>this.toClipboard(e,this.input1)}>Copier</button>
                <h4 className="margin-sm-bottom margin-md-top">Image de Blog - Small</h4>
                <input defaultValue={`[IMG]${this.props.photo.thumb}[/IMG]`} ref={el => this.input2 = el} className="small-input margin-sm-bottom"></input>
                <button className="button button-small button-white button-hover-green" onClick={e=>this.toClipboard(e,this.input2)}>Copier</button>
                <h4 className="margin-sm-bottom margin-md-top">Image de Blog - Medium</h4>
                <input defaultValue={`[IMG]${this.props.photo.medium}[/IMG]`} ref={el => this.input3 = el} className="small-input margin-sm-bottom"></input>
                <button className="button button-small button-white button-hover-green" onClick={e=>this.toClipboard(e,this.input3)}>Copier</button>
                <h4 className="margin-sm-bottom margin-md-top">Element image HTML</h4>
                <input defaultValue={`<img src="${this.props.photo.medium}" alt="${this.props.album.name}"/>`} ref={el => this.input4 = el} className="small-input margin-sm-bottom"></input>
                <button className="button button-small button-white button-hover-green" onClick={e=>this.toClipboard(e,this.input4)}>Copier</button>
            </div>
        );  
    }
    

  
};