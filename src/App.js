import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksRead from './BooksRead'
import BooksWants from './BooksWants'
import BooksCurrent from './BooksCurrent'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books:[
      {title:"Ender's Game", author:"Orson Scott Card", shelf:"currentlyReading"},
      {title:"To Kill a Mckingbird", author:" Harper Lee", shelf:"wantToRead"},
      {title:"The Hunger Games", author: "Some Lady", shelf:"read"},
      {title:"The Hunger Games", author: "HELLA YEA", shelf:"read"}

    ]

    /**
     *Sepparate each page by Route
     * Modulate the app
     * Sepparate The Books
     * Add The API
     */
   
  }

  render() {
    let read = []
    let current = []
    let wants = []

    const { books } = this.state//hold the books state in this variable 


    books.filter((b)=>{
      if(b.shelf == "read"){
        read.push(b)
      }
  
      if(b.shelf ==  "currentlyReading"){
        current.push(b)
      }
    
      if(b.shelf == "wantToRead")
        wants.push(b)
  
    })


    
 
 // make divs up here

    return (
      <div className="app">

          <Route path="/" exact render ={()=> (
     
          
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
            
               <BooksCurrent
              current = {current}
              />
            
              <BooksRead
               read = {read}
              />
            
              <BooksWants
              wants = {wants}
              />
            
             
               
              </div>
              <div className="open-search" >
                <a href="/search">Add a book</a>
              </div>
            </div>
            )} 
          />
        
        
        
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
