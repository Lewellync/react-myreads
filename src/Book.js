import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

  render() {
    const { shelf } = this.props.book;

    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128, height: 193,
              backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
            }}>
            </div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={(event) => this.props.moveBook(this.props.book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.props.book.authors && (this.props.book.authors.map((author) => (
            <div key={author} className="book-authors">{author}</div>
          )))}
        </div>
      </div>
    );
  }
}

Book.propTypes = {

};

export default Book;