import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import ListBooks from "./ListBooks.js";
import Search from "./Search.js";
import BooksContext from "./BooksContext";

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    currentlyReadingId: [],
    wantToReadId: [],
    readId: [],
    updateBooks: books => {
      this.updateBooks(books);
    }
  };

  componentDidMount() {
    this.updateBooks();
  }

  updateBooks() {
    BooksAPI.getAll().then(books => {
      const collections = ["currentlyReading", "wantToRead", "read"];
      const collectionsState = {};

      collections.forEach(function(collection) {
        const idCollectionName = `${collection}Id`;
        collectionsState[collection] = books.filter(
          book => book.shelf === collection && book
        );
        collectionsState[idCollectionName] = collectionsState[collection].map(
          book => book.id
        );
      });

      this.setState(() => collectionsState);
    });
  }

  render() {
    const {
      currentlyReadingId,
      wantToReadId,
      readId,
      currentlyReading,
      wantToRead,
      read
    } = this.state;
    return (
      <div className="app">
        <BooksContext.Provider value={this.state}>
          <Route
            exact
            path="/"
            render={() => (
              <ListBooks
                bookshelves={{
                  currentlyReading,
                  wantToRead,
                  read
                }}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <Search
                bookshelves={{
                  currentlyReadingId,
                  wantToReadId,
                  readId
                }}
              />
            )}
          />
        </BooksContext.Provider>
      </div>
    );
  }
}

export default BooksApp;
