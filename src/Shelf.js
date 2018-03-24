import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class Shelf extends Component {

  state = {

  }

  render() {
    console.log(this.props.books)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Book
                  name={book.title}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {

};

export default Shelf;