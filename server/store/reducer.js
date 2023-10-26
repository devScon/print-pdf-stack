const { ADD_USER, REMOVE_USER, ADD_USER_INPUT, REMOVE_USER_INPUT, UPDATE_USER_INPUT, ADD_SECRET } = require("./action");

const INITIAL_USER_STATE = []

const INITIAL_USER_INPUT_STATE = []

const userReducer = (state = INITIAL_USER_STATE, action) => {
    console.log(`the input is ${JSON.stringify(action, null, 2)}`)
    switch(action.type) {
        case ADD_USER:
            return [...state, action.payload.user]
        case REMOVE_USER:
            return state.filter(user => user.id != action.payload.id)
        case ADD_SECRET:
            return state.map(user => {
                if(user.id === action.payload.id) {
                    return {...user, secret: action.payload.secret}
                }else{
                    return user
                }
            })
        default:
            return state
    }
}

const userInputReducer = (state = INITIAL_USER_INPUT_STATE, action) => {
    console.log(`the received payload is ${JSON.stringify(action, null, 2)}`)
    switch(action.type) {
        case ADD_USER_INPUT:
            return [...state, action.payload]
        case REMOVE_USER_INPUT:
            return state.inputPayload.filter(input => input.id != action.payload.id)
         case UPDATE_USER_INPUT:
            return state.inputPayload.map(input => {
                if(input.id == action.payload.id){
                    return {...input, secret: action.payload.secret}
                } else {
                    return input
                }
            })
        default:
            return state
    }
}

module.exports = {userInputReducer, userReducer}