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
                currentContent: action.cIndex,
                contentNumber: action.cNum
            }
        }
        
        case actionTypes.ADD_SECTION: return {
            
            ...state,
            sections: [...state.sections.slice(0, state.sections.length),
                {   
                            index: state.sections.length + 1 + action.sectionName,
                            division: action.sectionName,
                          },
            ...state.sections.slice(state.sections.length)],
            
            gridShowing: !state.gridShowing
            
        }

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


        case actionTypes.REMOVE_SECTION: return {

            ...state,
            sections: [...state.sections.slice(0, action.index), ...state.sections.slice(action.index + 1)]
        }

        case actionTypes.UPDATE_CONTENT: return {
            
            ...state,
            currentText: action.content
        }

        case actionTypes.ACTIVATE_CONTENT: return {
            
            ...state,
            sections: [...state.sections.map((item, index) => {
                if (index !== action.index) {
                    return item
                }
                return {
                    ...item,
                     index: action.index, division: state.sections[action.index].division, content: action.cArray
                    //{index: 0, division: 0, content: action.cArray}
                }
            })]
        }

       
        
        default: 
        return state;
    }
    
};

export default reducer;