import React, { Component } from "react";

export default function(ComposedComponent){
    
    class TagsComponent extends Component {
        
        tagsStringToArray(str, min = 4, array = []){
            if(!str) return;
            const filtered = str.replace(/[.,;"?!]/g, "").split(/[\s\']/);
            return filtered.filter((tag, index)=>{
                if(!array && tag.length > min) return true;
                else if(/\d{4,20}/.test(tag) && array.indexOf(tag) === -1) return true;
                else if(/\b[A-Z]/.test(tag) && index !== 0 && array.indexOf(tag.toLowerCase()) === -1) return true;
                else if(array && array.indexOf(tag.toLowerCase()) === -1 && tag.length > min) return true;
            }).map(tag=>tag.toLowerCase());
        }
        
        renderTagsElement(tagsArray){
            if(Array.isArray(tagsArray) && tagsArray[0] != undefined && tagsArray[0].length > 0){
                return (
                    <div className="tags">
                        {tagsArray.map((tag, index) => {
                            return <span className="tag" key={index}>#{tag}</span>;
                        })}
                    </div>
                );        
            } else {
                return null;
            }
        }
        
        render(){
            return (
                <ComposedComponent 
                    tagsStringToArray={this.tagsStringToArray}
                    renderTagsElement={this.renderTagsElement}
                    {...this.props} 
                />
            );
        }
    }
    return TagsComponent;
}