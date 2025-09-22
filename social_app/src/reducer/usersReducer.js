import { SET_USERS, APPEND_USERS, ADD_USER, UPDATE_USER, DELETE_USER, TOGGLE_EDIT_MODE} from '../actions/signupActions';
let initialState = {
    users: []
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: action.payload };
        case APPEND_USERS:
            return { ...state, users: [...state.users, ...action.payload] };
        case ADD_USER:
            return { ...state, users: [...state.users, action.payload] };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((u) =>
                    u.id === action.payload.id ? { ...u, ...action.payload.updatedData } : u
                )
            };
        case DELETE_USER:
            return { ...state, users: state.users.filter((u) => u.id !== action.payload) };
        case TOGGLE_EDIT_MODE:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload
                        ? { ...user, isEditing: !user.isEditing }
                        : user
                )
            };
        default:
            return state
    }
}