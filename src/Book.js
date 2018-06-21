import React, { Component } from "react";
import { update } from "./BooksAPI";

class Book extends Component {
  state = {
    shelf: this.props.book.shelf || "none"
  };

  handleReadChange(e) {
    const { book } = this.props;
    const target = e.target;
    const value = target.value;
    console.log(value, book);
    this.setState(() => ({
      shelf: value
    }));

    update(book, value).then(books => {
      console.log(books);
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
                backgroundImage: `url(${imageLinks.smallThumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={e => {
                  this.handleReadChange(e);
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
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
