import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksRead from './BooksRead'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books:[
      {title:"Ender's Game", author:"Orson Scott Card", shelf:"currentlyReading"},
      {title:"To Kill a Mckingbird", author:" Harper Lee", shelf:"wantToRead"},
      {title:"The Hunger Games", author: "Some Lady", shelf:"read"}

    ],

    /**
     *Sepparate each page by Route
     * Modulate the app
     * Sepparate The Books
     * Add The API
     */
   
  }

  render() {
    const { books } = this.state//hold the books state in this variable 
    
    let read = []

    books.filter((b=>{
      if (b.shelf === "read")
        read.push(b)
    }))

 // make divs up here

    return (
      <div className="app">

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
    
            <BooksRead read={read}/>

    
             
            </div>
            <div className="open-search">
              <a >Add a book</a>
            </div>
          </div>

        <Route path="/search" exact render={()=>(

          <SearchBooks 
          
          />
        )}
/> 
      
      </div>
    )
  }
}

export default BooksApp
