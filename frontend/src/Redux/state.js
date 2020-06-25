import { createStore, applyMiddleware } from 'redux'
// import axios from 'axios';
import { combineReducers } from 'redux'
import { authReducerFunction } from './../Reducers/authReducer'
// import { videoReducerFunction } from './../Reducers/videoReducer'
import thunk from 'redux-thunk'

const rootReducers = combineReducers({
    auth: authReducerFunction
        // video: videoReducerFunction
})

// Create Package
const store = createStore(rootReducers, applyMiddleware(thunk))
export default store;
// export default rootReducers