const { userReducer, userInputReducer } = require('./reducer');
const {createStore, combineReducers} = require('redux');
const rootReducer = combineReducers({users: userReducer, userInput: userInputReducer})
const store = createStore(rootReducer)

module.exports = {store}