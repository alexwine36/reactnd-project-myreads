import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import BooksContext from "./BooksContext";

class ListBooks extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    updateBooks: books => {
      this.updateBooks(books);
    }
  };

  componentDidMount() {
    this.updateBooks();
  }

  updateBooks() {
    BooksAPI.getAll().then(books => {
      const currentlyReading = books.filter(
        book => book.shelf === "currentlyReading" && book
      );
      const wantToRead = books.filter(
        book => book.shelf === "wantToRead" && book
      );
      const read = books.filter(book => book.shelf === "read" && book);

      // console.log("currentlyReading", currentlyReading);
      // console.log("wantToRead", wantToRead);
      // console.log("read", read);
      this.setState(() => ({
        currentlyReading,
        wantToRead,
        read
      }));
    });
  }

  render() {
    return (
      <BooksContext.Provider value={this.state}>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf
                title="Currently Reading"
                books={this.state.currentlyReading}
              />
              <Bookshelf title="Want to Read" books={this.state.wantToRead} />
              <Bookshelf title="Read" books={this.state.read} />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </BooksContext.Provider>
    );
  }
}

export default ListBooks;
