import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BooksContainers from './BooksContainers'
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books:[]
  }


  // call The API
componentDidMount(){
  BooksAPI.getAll().then((books)=>{
    this.setState({books})
  })
}


 
  

  //switch books
  booksMove=(id,e, object)=>{
    
    const shelf = e
    const bookArray = object.props.book.filter(b=> b.id === id)
    const book = bookArray.shift()
   

    if (book.shelf !== shelf){ 
      BooksAPI.update(book,shelf).then(()=>{

        book.shelf = shelf
        
        
        this.setState(state=>({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
    
    
  
  }

  render() {
    
    const { books } = this.state

    //Sepparate the books and sort them by shelfs    
    
    //shelves
    const read = books.filter(book => book.shelf === "read" )
    const wantToRead = books.filter(book => book.shelf === "wantToRead" )
    const currentlyReading  = books.filter(book => book.shelf === "currentlyReading" )


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
                      book = {currentlyReading}
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
                    book = {wantToRead}
                    onMoveBooks = {this.booksMove}
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
          onMoveBooks = {this.booksMove}
          books = { books }
          onUpdateBooks = {this.updateBooks}
          />
        )}
        /> 
      
      </div>
    )
  }
}

export default BooksApp
