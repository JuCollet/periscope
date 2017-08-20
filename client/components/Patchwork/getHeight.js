"use strict";

let sizeReference = 0;

const _getImgHeight = function(index, array, columns, viewWidth, gutter){
    const startIndex = Math.floor(index/columns)*columns;
    let rowWidth = 0;
    for(let i = startIndex;i < startIndex+columns; i++){
        if(array[i]){
            const ratio = 666/array[i].height;
            rowWidth += array[i].width*ratio;
        }
    }
    const widthRatio = (viewWidth-gutter*(columns-1))/rowWidth;
    let finalHeight = widthRatio*666;
    if(index === 0) {sizeReference=finalHeight;}
    return finalHeight/sizeReference > 1.5 && columns > 2 ? sizeReference : finalHeight;
};

const getImgHeight = function(array, viewWidth, gutter, breakpoints){
    const columns = breakpoints.find(function(o){
        return viewWidth >= o.breakpoint;
    }).columns;
    
    return array.map(function(photo, index, array){
        return _getImgHeight(index, array, columns, viewWidth, gutter);
    });
    
};

export default getImgHeight;