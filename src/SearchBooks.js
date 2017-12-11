import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBY from 'sort-by'


class SearchBooks extends Component{

state={
    books:[],
    query: ''
}

  // call The API
 componentDidMount(){
     this.updateQuery()
 }
 



  updateQuery = ( query, books ) =>{
      
    this.setState({
          query: query.trim()
      })

    BooksAPI.search(query).then((books)=>{
        this.setState({books})
    })     
      
  }



  //Clear query
  clearQuery = ( query ) =>{
    this.setState({
        query: query = " "
    })
}



render(){
    const {books, query} = this.state
   
    console.log(books)
    
    let filterBooks 

    if ( query ){
        const match = new RegExp(escapeRegExp(query), 'i')  
        filterBooks = books.filter((book)=> match.test(book.title))

    } 
    else {
        filterBooks = this.state.books
    }



      

    return(
       
             <div className="search-books">
            <div className="search-books-bar">

            <Link
                to="/"
                className="close-search"
            >Close</Link>

              <div className="search-books-input-wrapper">
              
                <input 
                type="text" 
                placeholder="Search by title or author"
                onChange = {(e) => this.updateQuery(e.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              
              {filterBooks.map((b)=>(
                  <li>{b.title}</li>
              ))}
              
              </ol>
            </div>
          </div>
        
    )
}

}

export default SearchBooks