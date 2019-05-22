import * as actionTypes from './actions';

const initialState = {
    section: 0,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_SECTION: return {
            ...state,
            section: {
                ...state.section,
                [action.sectionName]: state.section[action.sectionName] + 1
            }
        }
        case actionTypes.ADD_CONTENT: return {

        }
        default: 
        return state;
    }
    
};

export default reducer;