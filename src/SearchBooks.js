import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BooksContainers from './BooksContainers'
import {Debounce} from 'react-throttle'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBY from 'sort-by'


class SearchBooks extends Component{

state={
    eror:'',
    results:[],
    query: ''
}

// call The API
componentDidMount(){
 this.updateQuery()
 
}





updateQuery = ( query ) =>{
  
  const book = this.props.books
  this.setState({
    query: query.trim()
  })

  BooksAPI.search(query).then((books)=>{
    
    

    //for loop to determine what books are on my shelf
    BooksAPI.getAll().then((booksInShelfs)=>{
      
      for(let b in books){
    
        for(let s in booksInShelfs){

          if (books.error){
            console.log([books])
            this.setState({error:"error"})
          }

          if(books[b].id == booksInShelfs[s].id){
           //console.log(books)
            
            books[b] = booksInShelfs[s]
            this.setState({results:books})
            this.setState({error:" "})
          }
         
          
        }
      }
    


    })

  })    
}



  //Clear query
  clearQuery = ( query ) =>{
    this.setState({
        query: query = " "
    })

   
}


    

render(){
    const { query, results, error} = this.state
    const { onMoveBooks} = this.props
    console.log(error)

    let filterBooks 

    if ( query ){
        const match = new RegExp(escapeRegExp(query), 'i')  
        filterBooks = results.filter((book)=> match.test(book.title))

    } 
    else {
        filterBooks = results
    }

    const hide = {
      display:"none", 
    }
    
    //Book Error Handler
    let renError 
    if (error === 'error'){
     renError = 
       <h1> Unfurtunately we couldn't find  this book or author, try another title or author </h1>
    } else {
      renError =  <h3> results for - {query}</h3>
    }

    return(
       
             <div className="search-books">
            <div className="search-books-bar">
            <Link
                to="/"  
                className="close-search"
            >Close</Link>

              <div className="search-books-input-wrapper">
              <Debounce time="1000" handler="onChange">
                <input 
                type="text" 
                placeholder="Search by title or author"
                onChange = {(e) => this.updateQuery(e.target.value)}
                />
              </Debounce>
              </div>
            </div>

            <div className="search-books-results">
               
          
            {renError}
              <ol className="books-grid">
              <BooksContainers
              book={results}
              onMoveBooks = {onMoveBooks}
              />        

              </ol>
            </div>
          </div>
        
    )
}

}

export default SearchBooks