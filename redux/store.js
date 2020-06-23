import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import token from './reducers/token'
import currentUser from './reducers/currentUser'
import posts from './reducers/posts'
import alertNotif from './reducers/alertNotif'
import stretchLayout from './reducers/stretchLayout'
import eventSearch from './reducers/eventSearch'
import userDD from './reducers/userDD'
import searchFor from './reducers/searchFor'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducers = combineReducers({
    token,
    currentUser,
    posts,
    alertNotif,
    stretchLayout,
    eventSearch,
    userDD,
    searchFor,
})

const store = () => createStore(reducers, bindMiddleware([thunkMiddleware]))

export default store