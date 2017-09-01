import React, { Component } from "react";
import './styles.less';

class DragSelect extends Component {
  
  constructor(props){
    super(props);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
    this.positionUpdate = this.positionUpdate.bind(this);
    this.stepUpdate = this.stepUpdate.bind(this);
    this.state = {
      cursorPosition : null,
      dragZonePosition : null,
      currentStep : null
    };
  }

  positionUpdate(){
    this.setState({
      cursorPosition : {
        left : this.dragCursor.getBoundingClientRect().left,
        right : this.dragCursor.getBoundingClientRect().right
      },
      dragZonePosition : {
        left : this.dragZone.getBoundingClientRect().left,
        right: this.dragZone.getBoundingClientRect().right
      }
    });
  }
  
  componentDidMount(){
    this.positionUpdate();
    this.dragCursor.addEventListener('mousedown', this.onStartDrag);
    this.dragCursor.addEventListener('touchstart', this.onStartDrag);    
    window.addEventListener('resize', this.positionUpdate);
    window.addEventListener('mouseup', this.onStopDrag);    
    window.addEventListener('touchend', this.onStopDrag);
  }
  
  componentWillUnmount(){
    this.dragCursor.removeEventListener('mousedown', this.onStartDrag);
    window.removeEventListener('resize', this.positionUpdate);
    window.removeEventListener('mouseup', this.onStopDrag);
    window.removeEventListener('touchend', this.onStopDrag);    
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('touchmove', this.onDrag);    
  }  
  
  onStartDrag(e){
    e.preventDefault();
    window.addEventListener('mousemove', this.onDrag, true);
    window.addEventListener('touchmove', this.onDrag);    
  }
  
  stepUpdate(step){
    if(step !== this.state.currentStep){
      this.props.callback(step);
    }
    this.setState({currentStep : step});
  }

  onDrag(e){
    e.preventDefault();
    let { cursorPosition, dragZonePosition } = this.state;
    
    const SliderSteps = (dragZonePosition.right - dragZonePosition.left) / (this.props.valuesArray.length-1);
    
    if(e.touches && e.touches[0].clientX >= dragZonePosition.left && e.touches[0].clientX <= dragZonePosition.right){
      const nextPos = e.touches[0].clientX-dragZonePosition.left;
      this.dragCursor.style.left = nextPos + "px";
      this.stepUpdate(Math.round(nextPos/SliderSteps));
      if(this.dragCursor.getBoundingClientRect().right === dragZonePosition.right){
        this.dragCursor.style.right = dragZonePosition.right + "px";        
        this.onStopDrag();
      }  
    } else if(e.clientX >= dragZonePosition.left && e.clientX <= dragZonePosition.right){
      const nextPos = e.clientX-dragZonePosition.left;
      this.dragCursor.style.left = nextPos + "px";
      this.stepUpdate(Math.round(nextPos/SliderSteps));
      if(this.dragCursor.getBoundingClientRect().right === dragZonePosition.right){
        this.dragCursor.style.right = dragZonePosition.right + "px";        
        this.onStopDrag();
      }
    } else {
      this.onStopDrag();
    }
  }
  
  onStopDrag(){
    window.removeEventListener('mousemove', this.onDrag, true);
    window.removeEventListener('touchmove', this.onDrag);    
  }
  
  render(){
    return (
        <div className="dragSelect">
          <div ref={(node) => {this.dragZone = node}} className="dragZone"></div>
          <div ref={(node) => {this.dragCursor = node}} className="dragCursor"></div>
        </div>
    );
  }
}

export default DragSelect;