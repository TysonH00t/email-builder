import React from 'react';
import './Move.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//importing Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


const Move = (props) => (
    <button draggable='true' className='move' onDragStart={props.onSectionDrag}><FontAwesomeIcon icon="arrows-alt" /></button>
    
)

 //Import Redux Functions
 const mapDispatchToProps = dispatch => {
    return {
      onSectionDrag: () => dispatch({type: actionTypes.MOVE_SECTION, sectionDrag: 'true'}),
    }
  }

  export default connect(null, mapDispatchToProps)(Move);