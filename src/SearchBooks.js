import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BooksContainers from './BooksContainers'

import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBY from 'sort-by'


class SearchBooks extends Component{

state={
    results:[],
    query: ''
}

  // call The API
 componentDidMount(){
     this.updateQuery()
 }
 



  updateQuery = ( query, book ) =>{
    const  books = this.props.books
    console.log(books)
    this.setState({
          query: query.trim()
      })

    BooksAPI.search(query).then((results)=>{
      this.setState({
        results
      })
  
    })     
      
  }



  //Clear query
  clearQuery = ( query ) =>{
    this.setState({
        query: query = " "
    })
}


    //Update API
    
 

render(){
    const { query, results } = this.state
    const { onMoveBooks,books } = this.props
    

    
 
   
    
    
    let filterBooks 

    if ( query ){
        const match = new RegExp(escapeRegExp(query), 'i')  
        filterBooks =  results.filter((book)=> match.test(book.title))

    } 
    else {
        filterBooks = results
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
             <BooksContainers
             onMoveBooks = {onMoveBooks}
             book = { filterBooks }
             />
              
              </ol>
            </div>
          </div>
        
    )
}

}

export default SearchBooks