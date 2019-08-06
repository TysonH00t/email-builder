import React from 'react';
import './Move.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//importing Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const onDragStart = (e, index, props) => {
  props.onSectionDrag(true);
  e.dataTransfer.setData("id", index);
}


const Move = (props) => (
    <div className="movePosition">
      <button className='Move' draggable='true' onDragEnd={() => props.onSectionDrag(false)} onDragStart = {(e) => onDragStart(e, props.index, props)}><FontAwesomeIcon icon="arrows-alt" /></button>
    </div>
    
)

 //Import Redux Functions
 const mapDispatchToProps = dispatch => {
    return {
      onSectionDrag: (bool) => dispatch({type: actionTypes.SECTION_DRAG, bool: bool}),
    }
  }

  export default connect(null, mapDispatchToProps)(Move);