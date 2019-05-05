
import React from 'react';
import {Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AddBook from './components/addBook';
import ListBook from './components/listBooks';
import Loader from './components/Loader/loader.js';
import './styles/index.scss';
class App extends React.Component {

	render() {
		let { loaderFlag } = this.props;
		return (
				<div style={{textAlign:'center'}}>
				<Loader loaderFlag={loaderFlag} /> 
		          <Route exact path="/" component={ListBook} />   
		          <Route exact path="/addBook" component={AddBook} />       
		          <Route exact path="/editBook/:id" component={AddBook} />       
		    </div>
		);
	}
}

const mapStateToProps = state => {
	return{
		loaderFlag: state.booksReducer.loaderFlag
	}
}


export default connect(mapStateToProps, null, null, {pure:false})(App)
