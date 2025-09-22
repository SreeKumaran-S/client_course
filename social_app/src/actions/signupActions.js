export const SET_USERS = "SET_USERS";
export const APPEND_USERS = "APPEND_USERS";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE";

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
});

export const appendUsers = (users) => ({
    type: APPEND_USERS,
    payload: users
});

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
});

export const updateUser = (id, updatedData) => ({
    type: UPDATE_USER,
    payload: { id, updatedData }
});

export const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: id
});

export const toggleEditMode = (id) =>({
    type: TOGGLE_EDIT_MODE,
    payload: id
});
