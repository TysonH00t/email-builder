import * as actionTypes from './actions';
// import InitialValue from '../Components/Text/TextEditor/InitialValue';
// import { Value } from "slate";

import React from 'react';
import {
    EditorState,
    CompositeDecorator
  } from "draft-js";


  function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  }
  
  const Link = props => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <a href={url}>{props.children}</a>;
  };

const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    }
  ]);

const initialState = {
    gridShowing: false,
    contentShow: false,
    displayContent: false,
    sectionDrag: false,
    currentSelection: {
        currentSection: null,
        currentContent: null,
        contentNumber: null,
    },
    sections: [],
    currentText: {
    editorState: EditorState.createEmpty(decorator),
    showURLInput: false,
    urlValue: ""
      },
      currentAlignment: 'left'

};

const reducer = (state = initialState, action) => {
    //Show/Hide add section grid
    switch(action.type) {
        case actionTypes.SHOW_GRID: return {
            ...state,
            gridShowing: !state.gridShowing,
        }

        //Displays text editor and updates current selection
        case actionTypes.SHOW_EDITOR: return {
            ...state,
            contentShow: !state.contentShow,
            currentSelection: {
                currentSection: action.index,
                currentContent: action.cIndex,
                contentNumber: action.cNum
            }
        }
        
        //Add section (with proper content amounts) to builder
        case actionTypes.ADD_SECTION: return {
            
            ...state,
            sections: [...state.sections.slice(0, state.sections.length),
                {   
                            index: state.sections.length + 1 + action.sectionName,
                            division: action.sectionName,
                            edit: true,
                            content: action.contentNum,
                            backgroundColor: 'white',
                          },
            ...state.sections.slice(state.sections.length)],
            
            gridShowing: !state.gridShowing
            
        }

        //PLACEHOLDER -- WHAT DOES IT DO
        case actionTypes.DISPLAY_CONTENT: return {
            
            ...state,
            ...state.sections.map((item, index) => {
                if (index !== action.index) {
                    return item
                }
                return {
                    ...item,
                    item: {index: action.item.index, division: action.item.division, content: [
                        {
                        visible: true,
                        content: ''
                    }
                    ]}
                }
            })
        }

        //Remove section based on click
        case actionTypes.REMOVE_SECTION: return {

            ...state,
            sections: [...state.sections.slice(0, action.index), ...state.sections.slice(action.index + 1)]
        }

        //Update content with current text editors content
        case actionTypes.UPDATE_CONTENT: return {
            
            ...state,
            currentText: action.content,
            currentAlignment: action.alignment
        }

        //PLACEHOLDER -- WHAT DOES IT DO
        case actionTypes.ACTIVATE_CONTENT: return {
            
            ...state,
            sections: [...state.sections.map((item, index) => {
                if (index !== action.index) {
                    return item
                }
                return {
                    ...item,
                     index: state.sections[action.index].index, division: state.sections[action.index].division, edit: state.sections[action.index].edit, content: action.cArray, backgroundColor: state.sections[action.index].backgroundColor, currentAlignment: action.currentAlignment,
                    //{index: 0, division: 0, content: action.cArray}
                }
            })]
        }

        case actionTypes.UPDATE_COLOR: return {
            ...state,
            sections: [...state.sections.map((item, index) => {
                if (index !== action.index) {
                    return item
                }
                return {
                    ...item,
                     index: state.sections[action.index].index, division: state.sections[action.index].division, edit: state.sections[action.index].edit, content: state.sections[action.index].content, backgroundColor: action.color
                    //{index: 0, division: 0, content: action.cArray}
                }
            })]
        }

        case actionTypes.SECTION_DRAG: return {
            
            ...state,
            sectionDrag: action.bool
        }

        case actionTypes.MOVE_SECTION:
        let id;
        if(action.e != null){
            id = action.e.dataTransfer.getData("id");

        }
        let moveArr = [...state.sections];
        if (action.ind >= moveArr.length) {
            var k = action.ind - moveArr.length + 1;
            while (k--) {
                moveArr.push(undefined);
            }
        }
        moveArr.splice(action.ind, 0, moveArr.splice(id, 1)[0]);
        return {
            ...state,
            sections: moveArr,
            sectionDrag: false

        
        // sections: arr;
        }

        case actionTypes.EDITABLE: return {
            
            ...state,
            sections: [...state.sections.map((item, index) => {
                if (index !== action.index) {
                    return item
                }
                return {
                    ...item,
                     index: state.sections[action.index].index, division: state.sections[action.index].division, edit: action.edit, content: state.sections[action.index].content, backgroundColor: state.sections[action.index].backgroundColor
                    //{index: 0, division: 0, content: action.cArray}
                }
            })]
        }

        
        default: 
        return state;
    }
    
};

export default reducer;