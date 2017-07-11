'use strict';

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { albumsFetch } from "../../actions/albums";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import Loading from "../../components/Loading/Loading";
import Card from "../../components/Cards/Cards";

class Albums extends Component {
  
  componentDidMount(){
    this.props.albumsFetch();
  }
  
  renderCard(){
    return _.map(this.props.albums, album => {
      return <NavLink to={`/app/photos/${album._id}`} key={album._id}><Card album={album} /></NavLink>;
    });
  }

  render(){

    if(!this.props.albums){
      return <Loading />;
    }
    
    return (
      <div id="albums">
        {this.renderCard()}
      </div>
    );  
  }
  
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ albumsFetch }, dispatch);
}

function mapStateToProps(state){
  return {
    albums : state.albums
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);