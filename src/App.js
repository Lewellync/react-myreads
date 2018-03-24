import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Search from './Search'
import './App.css'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search />
        )} />
        <Route exact path="/" render={() => (
          <div>

            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelf
                  name="Currently Reading"
                  books={this.state.books}
                />
                <Shelf
                  name="Want to Read"
                />
                <Shelf
                  name="Read"
                />
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                  className='search-book'
                >Search Books</Link>
              </div>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
