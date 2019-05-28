import React from 'react';
import TextEditor from './TextEditor/TextEditor';
import './Text.css';


const Text = (props) => {

    let stopEvent = (e) => {
        e.stopPropagation();
        //props.contentShow();
    }


    return(
    <div onClick={() => {props.contentShow(); props.transferContent()}} className="background">
        <div onClick={stopEvent} className='text'>
            <TextEditor />
        </div>
    </div>
    )
}

export default Text;