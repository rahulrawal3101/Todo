export const reducer = (state, action) => {
    switch (action.type) {
        case 'MAINDATA':
            return { ...state, allData: action.payload};
        case 'SHOWDATA':
            return {...state,filteredState:state.allData}
        case 'ALLTASK':
            return { ...state, filteredState:state.allData};
        case 'INPROGRESS':
            return { ...state, filteredState: action.payload};
        case 'COMPLETED':
            return { ...state, filteredState: action.payload};
        case 'TODAY':
            return { ...state, filteredState: action.payload};
        case 'TOMMOROW':
            return { ...state, filteredState: action.payload};
        case 'MONTH':
            return { ...state, filteredState: action.payload};
        case 'UPDATE' :{
            return {...state,filteredState:action.payload}
                   }
        case 'ALLTASK' :{
            return {...state,filteredState:action.payload}
                   }
        default:
            return state;
    }
}