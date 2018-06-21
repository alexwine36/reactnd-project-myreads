import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Book from "./Book";

import { search } from "./BooksAPI";

const NoResultsContainer = styled.div`
  height: fill-available;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
`;

class Search extends Component {
  state = {
    search: "",
    books: []
  };

  handleSearchChange(e) {
    const target = e.target;
    const value = target.value;
    this.setState(() => ({
      search: value
    }));

    value &&
      search(value).then(books => {
        const booksValue = Array.isArray(books) ? books : books.items;
        this.setState(() => ({
          books: booksValue
        }));
      });
  }

  renderBooks(booksReturned) {
    const { currentlyReadingId, wantToReadId, readId } = this.props.bookshelves;
    const books = booksReturned.map(book => {
      let collection = "";
      if (currentlyReadingId.includes(book.id)) collection = "currentlyReading";
      if (wantToReadId.includes(book.id)) collection = "wantToRead";
      if (readId.includes(book.id)) collection = "read";
      if (collection) book.searchShelf = collection;
      return book;
    });
    return books;
  }

  render() {
    const { books, search } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            {/* <BooksContext.Consumer>
              {context => ( */}
            <input
              type="text"
              value={this.state.value}
              onChange={e => {
                this.handleSearchChange(e);
              }}
              placeholder="Search by title or author"
            />
            {/* )}
            </BooksContext.Consumer> */}
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {search ? (
              books.length !== 0 ? (
                this.renderBooks(books).map(book => (
                  <Book key={book.id} book={book} />
                ))
              ) : (
                <NoResultsContainer>No Results Found</NoResultsContainer>
              )
            ) : (
              <NoResultsContainer>
                Enter Search Query to Find Books
              </NoResultsContainer>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
