import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksRead from './BooksRead'

class BooksApp extends React.Component {
  state = {
    books:[
      {name:"Ender's Game", author:"Orson Scott Card", shelf:"currentlyReading"},
      {name:"To Kill a Mckingbird", author:" Harper Lee", shelf:"wantToRead"},
      {name:"The Hunger Games", author: "Some Lady", shelf:"read"}

    ],

    /**
     *Sepparate each page by Route
     * Modulate the app
     * Sepparate The Books
     * Add The API
     */
    showSearchPage: false
  }

  render() {
    const { books } = this.state//hold the books state in this variable 
    
    let read = []

    books.filter((b=>{
      if (b.shelf === "read")
        read.push(b)
    }))

 

    return (
      <div className="app">



        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                 <BooksRead read={read}/>
             
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
