import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

  render() {
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div className={"book-cover" + (this.props.selected !== "none" ? " book-selected" : "")} style={{
              width: 128, height: 193,
              backgroundImage: `url(${this.props.thumbnail})`
            }}>
            </div>
            <div className="book-shelf-changer">
              <select value={this.props.shelf} onChange={(event) => this.props.moveBook(this.props.book, event.target.value)}>
                <option value="no" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          {this.props.authors.map((author) => (
            <div key={author} className="book-authors">{author}</div>
          ))}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  selected: PropTypes.string,
  thumbnail: PropTypes.string,
  shelf: PropTypes.string,
  title: PropTypes.string,
  authors: PropTypes.array,
  moveBook: PropTypes.func
};

export default Book;