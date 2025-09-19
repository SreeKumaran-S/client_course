let initialState = {
    username : null,
}

export default function signupReducer(state = initialState, action){
    switch(action.type){
        case "NAME_CHANGE":
            return {...state, username : action.payload}
        default :
            return state
    }
}