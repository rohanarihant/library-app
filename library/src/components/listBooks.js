import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBook, enableUpdateMode, updateBookList, enableSearch } from '../actions/booksActions';
import { Link } from 'react-router-dom';


class ListComponent extends PureComponent {
    componentDidMount() {
        this.props.getBook();
    }
    editBook(id, e) {
        this.props.history.push(`/editBook/${id}`);
        this.props.enableUpdateMode();
    }
    searchBook(e) {
        let { allBookList } = this.props;
        let { value } = e.target;
        let copyAllBookList = JSON.parse(JSON.stringify(allBookList));
        let filteredList = copyAllBookList.filter(book => {
            if (book.bookName.toLowerCase().indexOf(value) !== -1) {
                return book;
            }
        })
        if (value.length > 0) {
            this.props.enableSearch(true);
        }
        this.props.updateBookList(filteredList);
    }
    render() {
        let { allBookList, searchFlag, filteredList } = this.props;
        let bookList = searchFlag ? filteredList : allBookList;
        return (
            <Fragment>
                <Link to="/addBook" id="list-anchor" >Add new Book <span role="img">&#128214;</span></Link>
                <div className="list-container">

                    <span><h3 style={{ display: 'inline' }}>List of Books</h3><input type="text" name="searchKeyword" onChange={this.searchBook.bind(this)} placeholder="&#x1F50E; Seach with Book Name" /></span>
                    <table>
                        <thead>
                            <tr>
                                <th>S no.</th>
                                <th>Book Name</th>
                                <th>Book Description</th>
                                <th>Count</th>
                                <th>Author</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.length > 0 ?
                                bookList.map((book, index) => (
                                    <tr>
                                        <td>{book.id}</td>
                                        <td>{book.bookName}</td>
                                        <td>{book.description}</td>
                                        <td>{book.count}</td>
                                        <td>{book.author}</td>
                                        <td><img src="/images/icon-pencil.png" className="editIcon" alt="edit" onClick={this.editBook.bind(this, index + 1)} /></td>
                                    </tr>
                                )) : <tr><td colSpan={6} style={{ textAlign: 'center' }}>No Books to display</td></tr>}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        allBookList: state.booksReducer.allBookList,
        searchFlag: state.booksReducer.searchFlag,
        filteredList: state.booksReducer.filteredList
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getBook,
    enableUpdateMode,
    updateBookList,
    enableSearch
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(ListComponent)


