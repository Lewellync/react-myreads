import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types';

class Search extends Component {

  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    // console.log("Initial", query)
    this.setState({ query })
    if (query) {
      BooksAPI.search(query).then((searchResults) => {
        // console.log("Promise", query)
        // console.log(searchResults)
        if (searchResults.error || !this.state.query)
          this.setState({ books: [] })
        else
          this.setState({ books: searchResults })
      })
    } else {
      // console.log("Else", query)
      this.setState({ books: [] })
    }
  }

  render() {
    // console.log("Render", this.state.query)
    // console.log("Render", this.state.books)

    let showingBooks = this.state.query ? this.state.books : []
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

};

export default Search;