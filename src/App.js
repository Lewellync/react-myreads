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
      // console.log(books)
      this.setState({ books })
    })
  }

  moveBook = (book, shelf) => {
    // console.log("moveBook", book)
    // console.log("moveBook", shelf)
    BooksAPI.update(book, shelf).then(shelves => {
      // console.log(shelves)
      let newBooks = this.state.books
      book['shelf'] = shelf

      if (newBooks.some(b => b.id === book.id)) {
        if (shelf === 'none') {
          // console.log("filter", newBooks)
          newBooks = newBooks.filter(oldBook => oldBook.id !== book.id)
        } else {
          // console.log("map", newBooks)
          newBooks = newBooks.map((oldBook) => (
            oldBook.id === book.id ? { ...oldBook, "shelf": shelf } : oldBook
          ))
        }
      } else {
        if (shelf !== 'none') {
          newBooks = newBooks.concat(book)
          // console.log("concat", newBooks)
        }
      }

      this.setState({ books: newBooks })
    })
    // console.log("moveBook", this.state.books)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search
            books={this.state.books}
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
