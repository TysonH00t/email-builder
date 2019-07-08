import * as actionTypes from './actions';
import InitialValue from '../Components/Text/TextEditor/InitialValue';
import { Value } from "slate";

const initialState = {
    gridShowing: false,
    contentShow: false,
    displayContent: false,
    currentSelection: {
        currentSection: null,
        currentContent: null,
        contentNumber: null,
    },
    sections: [],
    currentText: {
        value: Value.fromJSON(InitialValue)
      }

};

const reducer = (state = initialState, action) => {
    //Show/Hide add section grid
    switch(action.type) {
        case actionTypes.SHOW_GRID: return {
            ...state,
            gridShowing: !state.gridShowing,
        }

        //PLACEHOLDER -- WHAT DOES IT DO
        case actionTypes.SHOW_CONTENT: return {
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
                            content: action.contentNum,
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
            currentText: action.content
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
                     index: state.sections[action.index].index, division: state.sections[action.index].division, content: action.cArray
                    //{index: 0, division: 0, content: action.cArray}
                }
            })]
        }

       
        
        default: 
        return state;
    }
    
};

export default reducer;