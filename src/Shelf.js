import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class Shelf extends Component {

  state = {

  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <Book 
              //name={this.props.books[0].name}
            />
          </ol>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {

};

export default Shelf;