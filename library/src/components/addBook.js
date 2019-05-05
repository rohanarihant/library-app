import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateBookObj, addBook, fetchBookDetail, updateBook, getBook, cleanBookState } from '../actions/booksActions';
import { Link } from 'react-router-dom';
class AddBook extends PureComponent {
  constructor(props) {
    super(props);
    this.updateField = this.updateField.bind(this);
  }
  updateField(e) {
    let { name, value } = e.target;
    let { bookObj } = this.props;
    bookObj[name] = value;
    bookObj[name + 'Error'] = '';
    this.props.updateBookObj(bookObj);
  }
  addBook(e) {
    let { bookObj, allBookList, updateMode, history } = this.props;

    this.checkValidation(bookObj);
    if (bookObj['bookName'] !== '' &&
      bookObj['description'] !== '' &&
      bookObj['count'] !== '' &&
      bookObj['author'] !== '') {
      if (updateMode) {
        this.props.updateBook(bookObj, history)
      } else {
        bookObj['id'] = allBookList.length + 1;
        this.props.addBook(bookObj, history);
      }
    }
  }
  checkValidation(bookObj) {
    for (let book in bookObj) {
      if (bookObj[book] === "" || "0") {
        let propName = book + 'Error';
        if (bookObj.hasOwnProperty(propName)) {

        } else {
          bookObj[propName] = "This field is required";
        }
        this.props.updateBookObj(bookObj);
      }
    }
  }
  componentDidMount() {

    let { match } = this.props;
    let { params } = match;
    this.props.getBook();
     Object.keys(params).length > 0 && this.props.fetchBookDetail(params.id);
  }
  componentWillUnmount() {
    this.props.cleanBookState();
  }
  render() {
    let { bookObj, updateMode } = this.props;
    return (
      <Fragment>
        <Link to="/" id="add-book-anchor">All Books&#128214;</Link>
        <div className="container">
          <p className="title">Add new Book</p>
          <div  >
            <input type="text" name="bookName" placeholder="Book Name" value={bookObj.bookName} onChange={this.updateField} />
            {bookObj.bookNameError && <p className="errorText">{bookObj.bookNameError}</p>}
          </div>
          <div  >
            <input type="text" name="description" placeholder="Book Description" value={bookObj.description} onChange={this.updateField} />
            {bookObj.descriptionError && <p className="errorText">{bookObj.descriptionError}</p>}
          </div>
          <div >
            <input type="number" name="count" placeholder="Book Count" value={bookObj.count} onChange={this.updateField} />
            {bookObj.countError && <p className="errorText">{bookObj.countError}</p>}
          </div>
          <div  >
            <input type="text" name="author" placeholder="Book Author" value={bookObj.author} onChange={this.updateField} />
            {bookObj.authorError && <p className="errorText">{bookObj.authorError}</p>}
          </div>
          <button onClick={this.addBook.bind(this)}>{updateMode ? 'Update' : 'Add'} Book</button><br />
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    bookObj: state.booksReducer.bookObj,
    fetchedBook: state.booksReducer.fetchedBook,
    updateMode: state.booksReducer.updateMode,
    allBookList: state.booksReducer.allBookList,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateBookObj,
  addBook,
  fetchBookDetail,
  updateBook,
  getBook,
  cleanBookState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(AddBook)
