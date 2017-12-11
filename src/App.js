import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BooksContainers from './BooksContainers'
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books:[
     // {id:1 ,title:"Ender's Game", author:"Orson Scott Card", shelf:"currentlyReading"},
     // {id:2 ,title:"To Kill a Mckingbird", author:" Harper Lee", shelf:"wantToRead"},
     // {id:3 ,title:"The Hunger Games", author: "Some Lady", shelf:"read"},
     // {id:4 ,title:"The Hunger Games", author: "HELLA YEA", shelf:"read"} Books Objects Reference

    ]

    /**
    
     
     
     * Add The API
     */
   
  }
  // call The API
componentDidMount(){
  BooksAPI.getAll().then((books)=>{
    this.setState({books})
  })
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
    
    //Sepparate the books and sort them by shelfs    
    
    //shelves
    let read = []
    let current = []
    let wants = []

    const { books } = this.state//hold the books state in this variable 
    books.filter((b)=>{
      if(b.shelf === "read"){
        read.push(b)
      }
  
      if(b.shelf ===  "currentlyReading"){
        current.push(b)
      }
    
      if(b.shelf === "wantToRead")
        wants.push(b)
  
    })


    return (
      <div className="app">

          <Route path="/" exact render ={()=> (
     
          
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">


             {/* Currently Reading  */}
              <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                    <BooksContainers
                      book = {current}
                      onMoveBooks ={this.booksMove}
                      />
              </div>
              </div>


            {/* Already Read  */}
              <div className="bookshelf">
              <h2 className="bookshelf-title">Already Read</h2>
              <div className="bookshelf-books">
                    <BooksContainers
                    book = {read}
                    onMoveBooks ={this.booksMove}
                    />
              </div>
              </div>  



               {/* Want To Read  */}
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Reading</h2>
                  <div className="bookshelf-books">    
                    <BooksContainers
                    book = {wants}
                    onMoveBooks ={this.booksMove}
                    />
              
                  </div>
              </div>
               
              </div>
              <div className="open-search" >
                <Link
                to="/search"
                > add a book
                </Link>
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
