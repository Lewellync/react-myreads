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

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(shelves => {
      let newBooks = this.state.books.map((oldBook) => (
        oldBook.title === book.title ? { ...oldBook, "shelf": shelf } : oldBook
      ))
      this.setState({ books: newBooks })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search 
            moveBook={this.moveBook}
          />
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
                  books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                  moveBook={this.moveBook}
                />
                <Shelf
                  name="Want to Read"
                  books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                  moveBook={this.moveBook}
                />
                <Shelf
                  name="Read"
                  books={this.state.books.filter((book) => book.shelf === "read")}
                  moveBook={this.moveBook}
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
