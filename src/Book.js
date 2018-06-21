import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { update } from "./BooksAPI";
import BooksContext from "./BooksContext";

const ImageContainer = styled.div`
  width: 128px;
  height: 188px;
  ${props =>
    props.backgroundImage &&
    css`
      background-image: url(${props.backgroundImage});
    `};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    opacity: 0.5;
  }
`;

class Book extends Component {
  state = {
    shelf: this.props.book.shelf || this.props.book.searchShelf || "none"
  };

  static propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.array,
      imageLinks: PropTypes.object
    }).isRequired
  };

  handleReadChange(e, context) {
    const { book } = this.props;
    const target = e.target;
    const value = target.value;
    this.setState(() => ({
      shelf: value
    }));
    update(book, value).then(books => {
      if (context) {
        context.updateBooks(books);
      }
    });
  }

  render() {
    const { title, authors, imageLinks, searchShelf } = this.props.book;
    const { shelf } = this.state;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <ImageContainer
              className="book-cover"
              backgroundImage={imageLinks && imageLinks.thumbnail}
            >
              {imageLinks === undefined && <div className="no-image-found" />}
            </ImageContainer>

            <BooksContext.Consumer>
              {context => (
                <div
                  className="book-shelf-changer"
                  style={searchShelf && styleSelectButton[shelf]}
                >
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
                </div>
              )}
            </BooksContext.Consumer>
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

const styleSelectButton = {
  context: {},
  currentlyReading: {
    backgroundColor: "#f00"
  },
  wantToRead: {
    backgroundColor: "#0f0"
  },
  read: {
    backgroundColor: "#00f"
  }
};

export default Book;
