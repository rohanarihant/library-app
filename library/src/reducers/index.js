import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as toastrReducer} from 'react-redux-toastr'
import booksReducer from './booksReducer';

export default combineReducers({
  toastr: toastrReducer,
  router: routerReducer,
  booksReducer
})
