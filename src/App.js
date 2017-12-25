import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Shelf from './Shelf'
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
    
    const shelf=e
    const bookArray=object.props.book.filter(b=> b.id === id)
    const book=bookArray.shift()
   

    if (book.shelf !== shelf){ 
      BooksAPI.update(book,shelf).then(()=>{

        book.shelf=shelf

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

          <Route path="/" exact render={()=> (
     
          
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">


             {/*  Read  */}
            <Shelf
              title={"Read"}
              book={read}
              onMoveBooks={this.booksMove}
            />

            {/*  Currently Reading  */}
              <Shelf
              title={"Currently Reading"}
              book={currentlyReading}
              onMoveBooks={this.booksMove}
            />

            {/*  Want To Read  */}
              <Shelf
              title={"Want To Read"}
              book={wantToRead}
              onMoveBooks={this.booksMove}
              />
              </div>

              {/* Search */}  
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
          onMoveBooks={this.booksMove}
          books={ books }
          onUpdateBooks={this.updateBooks}
          />
        )}
        /> 
      
      </div>
    )
  }
}

export default BooksApp
