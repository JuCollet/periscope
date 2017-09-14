import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { inviteFriend } from "../../../actions/user";

class MyFriends extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            friendName : "",
            friendEmail : "",
            canWrite : false,
            canDelete : false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    handleInputChange(e){
        if(e.target.type === "checkbox"){
            return this.setState({[e.target.name] : !this.state[e.target.name]});
        }
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    
    onSubmit(e){
        e.preventDefault();
        const {friendName, friendEmail, canWrite, canDelete} = this.state;
        const data = { friendName, friendEmail, canWrite, canDelete};
        this.props.inviteFriend(data);
    }
    
    render(){
        return(
            <div>
                <h3 className="margin-md-bottom">Tes amis</h3>
                <h3 className="margin-md-bottom">Inviter un ami</h3>
                <form onSubmit={this.onSubmit}>
                    <h4 className="margin-md-top margin-sm-bottom">Quel est son nom ?</h4>
                    <input name="friendName" type="text" placeholder="Prénom" onChange={this.handleInputChange} value={this.state.friendName} className="small-input"></input>
                    <h4 className="margin-md-top margin-sm-bottom">Son adresse E-Mail ?</h4>
                    <input name="friendEmail" type="email" placeholder="Adresse E-mail" onChange={this.handleInputChange} value={this.state.friendEmail} className="small-input"></input>
                    <div className="margin-sm-bottom margin-md-top">
                        <div className="margin-sm-bottom">
                            <input type="checkbox" name="canWrite" onChange={this.handleInputChange} />
                            <label htmlFor="canWrite" className="txt-darkGrey margin-sm-left">Autoriser à ajouter des photos ou à éditer les contenus</label>
                        </div>
                        <div>
                            <input type="checkbox" name="canDelete" onChange={this.handleInputChange} />
                            <label htmlFor="canDelete" className="txt-darkGrey margin-sm-left">Autoriser à supprimer des photos ou des albums</label>                        
                        </div>
                    </div>
                    <button type="submit" className="button button-small button-white button-hover-green margin-sm-top">Inviter</button>
                </form>
            </div>
        );
    }
    
}

function mapStateToProps(state){
    return {
        user : state.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ inviteFriend }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFriends);