import React, { Component } from "react";
import PropTypes from "prop-types";
import { update } from "./BooksAPI";
import BooksContext from "./BooksContext";

class Book extends Component {
  state = {
    shelf: this.props.book.shelf || "none"
  };

  static propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.array,
      imageLinks: PropTypes.object.isRequired
    }).isRequired
  };

  handleReadChange(e, context) {
    const { book } = this.props;
    const target = e.target;
    const value = target.value;
    this.setState(() => ({
      shelf: value
    }));

    console.log(context);

    update(book, value).then(books => {
      if (context) {
        context.updateBooks(books);
      }
    });
  }

  render() {
    const { title, authors, imageLinks } = this.props.book;
    const { shelf } = this.state;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${imageLinks &&
                  imageLinks.smallThumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <BooksContext.Consumer>
                {context => (
                  <select
                    value={shelf}
                    onChange={e => {
                      this.handleReadChange(e, context);
                    }}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                )}
              </BooksContext.Consumer>
            </div>
          </div>
          <div className="book-title">{title}</div>
          {authors &&
            authors.map((author, index) => (
              <div key={index} className="book-authors">
                {author}
              </div>
            ))}
        </div>
      </li>
    );
  }
}

export default Book;
