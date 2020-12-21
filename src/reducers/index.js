import { combineReducers } from 'redux'
import auth from './auth'
// import libraryBooks from './libraryBooks.js'
// import wishedBooks from './wishedBooks.js'
import showBook from './showBook.js'
import showUser from './showUser.js'
import allLibraryBooks from './allLibraryBooks.js'
import allWishedBooks from './allWishedBooks.js'

export default combineReducers({
    auth,
    showBook,
    showUser,
    allLibraryBooks,
    allWishedBooks
})