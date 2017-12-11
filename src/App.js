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
      {id:1 ,title:"Ender's Game", author:"Orson Scott Card", shelf:"currentlyReading"},
      {id:2 ,title:"To Kill a Mckingbird", author:" Harper Lee", shelf:"wantToRead"},
      {id:3 ,title:"The Hunger Games", author: "Some Lady", shelf:"read"},
      {id:4 ,title:"The Hunger Games", author: "HELLA YEA", shelf:"read"}

    ]

    /**
     *Sepparate each page by Route
     * Modulate the app
     * Sepparate The Books
     * Add The API
     */
   
  }



  //switch books
  booksMove=(id,e)=>{
    console.log(id, e)
    this.setState((state)=>{
      books:state.books.filter((b)=>{
        if(b.id === id){
          b.shelf = e
        }
      })
    })
    console.log(this.state.books.filter((b)=> b.shelf == "wantToRead"))
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
               onMoveBooks ={this.booksMove}
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
