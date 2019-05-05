import * as types from '../Utils/constants'
const initialState = {
    allBookList:[],
    filteredList:[],
    bookObj : {
        bookName:'',
        description:'',
        count:0,
        author:'',
     
    },
    updateMode:false,
    searchFlag:false,
    loaderFlag:false,
};
const copyBookObj = Object.assign({},initialState.bookObj);

export default (state = initialState, action) => {
    switch (action.type) {

        case types.FETCH_REQUESTED_LOADER_ENABLE:
        return {
            ...state,
            loaderFlag: true
        }
        case types.FETCH_REQUESTED_LOADER_DISABLE:
        return {
            ...state,
            loaderFlag: false
        }
        case types.UNABLE_UPDATE_MODE:
        return {
            ...state,
            updateMode: true
        }
        case types.UPDATE_BOOK_LIST_MODE:
        return {
            ...state,
            filteredList: action.filteredList
        }
        case types.CLEAN_BOOK_OBJ:
        return {
            ...state,
            bookObj: copyBookObj
        }
        case types.SEARCH_FLAG_FOR_LIST:
        return {
            ...state,
            searchFlag: action.searchFlag
        }
        case types.ADD_BOOKS_SUCCESS:
        return {
            ...state,
            bookObj: action.bookObj
        }
        case types.FETCH_PARTICULAR_BOOK_DETAIL:
        return {
            ...state,
            bookObj: action.fetchedBook
        }
        case types.FETCH_BOOK_LISTS:
        return {
            ...state,
            allBookList: action.allBookList
        }
       
        default:
        return state
    }
}
