import * as actionTypes from './actions';
import InitialValue from '../Components/Text/TextEditor/InitialValue';
import { Value } from "slate";

const initialState = {
    gridShowing: false,
    contentShow: false,
    displayContent: false,
    currentSelection: {
        currentSection: 0,
        currentContent: 0,
    },
    sections: [],
    currentText: {
        value: Value.fromJSON(InitialValue)
      }

};

const reducer = (state = initialState, action) => {
    //console.log(action.type + state.contentShow)
    //console.log(state.currentSelection)
    switch(action.type) {
        case actionTypes.SHOW_GRID: return {
            ...state,
            gridShowing: !state.gridShowing,
        }

        case actionTypes.SHOW_CONTENT: return {
            ...state,
            contentShow: !state.contentShow,
            currentSelection: {
                currentSection: action.index,
                currentContent: action.cIndex
            }
        }
        
        case actionTypes.ADD_SECTION: return {
            
            ...state,
            sections: [...state.sections.slice(0, state.sections.length),
                {   
                            index: state.sections.length + 1 + action.sectionName,
                            division: action.sectionName,
                            content: []
                          },
            ...state.sections.slice(state.sections.length)],
            
            gridShowing: !state.gridShowing
            
        }
        case actionTypes.REMOVE_SECTION: return {

            ...state,
            sections: [...state.sections.slice(0, action.index), ...state.sections.slice(action.index + 1)]
        }

        case actionTypes.UPDATE_CONTENT: return {
            
            ...state,
            currentText: action.content
        }
        case actionTypes.DISPLAY_CONTENT: return {
            
            ...state,
            displayContent: !state.displayContent
        }
        
        default: 
        return state;
    }
    
};

export default reducer;