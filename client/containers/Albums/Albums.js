'use strict';

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NoPhoto from "../../components/NoPhoto/NoPhoto";
import { albumsFetch } from "../../actions/albums";
import { searchType } from "../../actions/search";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import Loading from "../../components/Loading/Loading";
import Card from "../Cards/Cards";

class Albums extends Component {
  
  componentDidMount(){
    // Don't update the state if a photo search is in progress;
    if(this.props.search.searchTerm.substr(0,1) !== "#"){
      this.props.albumsFetch(); 
    }
    this.props.searchType("albums");
  }
  
  componentWillUnmount() {
    this.props.searchType(null);
  }
  
  isEmpty(obj){
    for(var key in obj){
      if(obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  render(){
    
    if(this.props.isFetching && this.isEmpty(this.props.albums)){
      return <Loading />;
    } else if(!this.props.isFetching && this.isEmpty(this.props.albums)){
      return <NoPhoto history={this.props.history}/>;
    }
    
    return (
      <div className="wrapper-padding bkg-lightGrey flex-mobile-bottom">
        {_.map(this.props.albums, album => {
          return <NavLink to={`/app/photos/${album._id}`} key={album._id}><Card album={album} /></NavLink>;
        })}
      </div>
    );  
  }
  
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ albumsFetch, searchType }, dispatch);
}

function mapStateToProps(state){
  return {
    albums : state.albums,
    search : state.search,
    isFetching : state.fetching.isFetching
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);