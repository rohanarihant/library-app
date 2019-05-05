import axios from 'axios';
import * as types from '../Utils/constants';
import {toastr} from 'react-redux-toastr';


export function updateBookObj(bookObj){
    return {
      type: types.ADD_BOOKS_SUCCESS,
      bookObj : bookObj
    }
  }
export function enableUpdateMode(){
    return {
      type: types.UNABLE_UPDATE_MODE,
    }
  }
export function updateBookList(filteredList){
    return {
      type: types.UPDATE_BOOK_LIST_MODE,
      filteredList : filteredList
    }
  }
export function cleanBookState(){
    return {
      type: types.CLEAN_BOOK_OBJ,
    }
  }
export function enableSearch(flag){
    return {
      type: types.SEARCH_FLAG_FOR_LIST,
      searchFlag : flag
    }
  }
  export const addBook = (newBook,history) => {
    return dispatch => {
        dispatch({type: types.FETCH_REQUESTED_LOADER_ENABLE});
    axios.post(`/api/addBook`,newBook)
        .then(function (response) {
            dispatch({type: types.SUCCESS_ADDED_BOOK, addBookResponse: response.data});
            dispatch({type: types.FETCH_REQUESTED_LOADER_DISABLE});
            dispatch(cleanBookState());
            toastr.success(response.data.message);
            history.push('/')
          })
          .catch(function (error) {
            dispatch({type: types.FAILED_ADDED_BOOK, error: error});
            dispatch({type: types.FETCH_REQUESTED_LOADER_DISABLE});
            toastr.error(error.data.message);
        })
}
}
  export const updateBook = (bookData,history) => {
    return dispatch => {
        dispatch({type: types.FETCH_REQUESTED_LOADER_ENABLE});
    axios.put(`/api/updateBook`,bookData)
        .then(function (response) {
          console.log(response,'response')
            dispatch({type: types.SUCCESS_ADDED_BOOK, addBookResponse: response.data});
            dispatch({type: types.FETCH_REQUESTED_LOADER_DISABLE});
            dispatch(cleanBookState());
            toastr.success(response.data.message);
            history.push('/')
          })
          .catch(function (error) {
            dispatch({type: types.FAILED_ADDED_BOOK, error: error});
            dispatch({type: types.FETCH_REQUESTED_LOADER_DISABLE});
            toastr.error(error.data.message);
        })
}
}
  export const getBook = () => {
    return dispatch => {
        dispatch({type: types.FETCH_REQUESTED_LOADER_ENABLE});
    axios.get(`/api/getAllBooks`)
        .then(function (response) {
            dispatch({type: types.FETCH_BOOK_LISTS, allBookList: response.data.allBooks});
            dispatch({type: types.FETCH_REQUESTED_LOADER_DISABLE});
        })
        .catch(function (error) {
            dispatch({type: types.FAILED_FETCH_BOOK_LISTS, error: error});
            dispatch({type: types.FETCH_REQUESTED_LOADER_DISABLE});
            toastr.error(error.data.message);
        })
}
}
  export const fetchBookDetail = (id) => {
    return dispatch => {
        dispatch({type: types.FETCH_REQUESTED_LOADER_ENABLE});
    axios.get(`/api/getBookDetail/${id}`)
        .then(function (response) {
            dispatch({type: types.FETCH_PARTICULAR_BOOK_DETAIL, fetchedBook: response.data.fetchedBook});
            dispatch({type: types.FETCH_REQUESTED_LOADER_DISABLE});
        })
        .catch(function (error) {
            dispatch({type: types.FAILED_FETCH_PARTICULAR_BOOK_DETAIL, error: error});
            dispatch({type: types.FETCH_REQUESTED_LOADER_DISABLE});
            toastr.error(error.data.message);
        })
}
}
