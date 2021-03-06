import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types';

class Search extends Component {

  state = {
    searchedBooks: [],
    query: ''
  }

  componentDidMount() {
    this.searchField.focus()
  }

  updateQuery = (query) => {
    // console.log("Initial", query)
    this.setState({ query })
    if (query) {
      BooksAPI.search(query).then((searchResults) => {
        // console.log("Promise", query)
        // console.log(searchResults)
        // console.log(this.props.books)
        if (searchResults.error || !this.state.query)
          this.setState({ searchedBooks: [] })
        else {
          searchResults = searchResults.map((oldBook) => {
            // console.log(oldBook)
            let check = this.props.books.find(b => b.id === oldBook.id)
            oldBook.shelf = check ? check.shelf : 'none'
            return oldBook
          })
          this.setState({ searchedBooks: searchResults })
        }
      })
    } else {
      // console.log("Else", query)
      this.setState({ searchedBooks: [] })
    }
  }

  render() {
    // console.log("Render", this.state.query)
    // console.log("Render", this.state.seachedBooks)
    let showingBooks = this.state.query ? this.state.searchedBooks : []
    // console.log("Render", showingBooks)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div>
            <Link
              to="/"
              className='close-search'
            >Close</Link>
          </div>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              ref={(input) => { this.searchField = input; }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  title={book.title}
                  selected={book.shelf}
                  shelf={book.shelf}
                  authors={book.authors || []}
                  thumbnail={(book.imageLinks && book.imageLinks.thumbnail) || ""}
                  moveBook={this.props.moveBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  books: PropTypes.array,
  moveBook: PropTypes.func
};

export default Search;