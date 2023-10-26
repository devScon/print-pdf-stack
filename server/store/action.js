const ADD_USER = "ADD_USER"
const REMOVE_USER = "REMOVE_USER"
const ADD_USER_INPUT = "ADD_USER_INPUT"
const REMOVE_USER_INPUT = "REMOVE_USER_INPUT"
const UPDATE_USER_INPUT = "UPDATE_USER_INPUT"
const ADD_SECRET = "ADD_SECRET"

const addUser =  (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

const removeUser =  (id) => {
    return {
        type: REMOVE_USER,
        payload: id
    }
}

const addUserInput =  (input) => {
    return {
        type: ADD_SECRET,
        payload: input
    }
}

const removeUserInput =  (id) => {
    return {
        type: REMOVE_USER_INPUT,
        payload: id
    }
}

const updateUserInput =  (input) => {
    return {
        type: UPDATE_USER_INPUT,
        payload: input
    }
}

module.exports = {
    ADD_USER,
    REMOVE_USER,
    ADD_USER_INPUT,
    REMOVE_USER_INPUT,
    UPDATE_USER_INPUT,
    ADD_SECRET,
    addUser,
    removeUser,
    addUserInput,
    removeUserInput,
    updateUserInput
}