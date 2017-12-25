
/** SearchBooks.js **/
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BooksContainers from './BooksContainers'
import {Debounce} from 'react-throttle'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import sortBY from 'sort-by'




class SearchBooks extends Component{

  //PropsTypes
  static propTypes = {
    onMoveBooks: PropTypes.func.isRequired
  }


state={
    error:'',
    results:[],
    query: '',
   
}

// call The API
componentDidMount(){

 this.updateQuery()
 
}





updateQuery = ( query ) =>{
  

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

          if(books[b].id === booksInShelfs[s].id){
           
            
            books[b]=booksInShelfs[s]

            //set the states
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
 
    
    
    let filterBooks 

    if ( query ){
        const match = new RegExp(escapeRegExp(query), 'i')  
        filterBooks = results.filter((book)=> match.test(book.title))

    } 
    else {
        filterBooks = results
    }

    filterBooks.sort(sortBY('title')) // allows to sort by a specific type

 
    //Book Error Handler
    let renError 
    if (error === 'error' && query){
     renError = 
       <h1> Unfurtunately we couldn't find "{ query }", try another title or author </h1>
    } else if ( query ){
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
                onChange={(e) => this.updateQuery(e.target.value)}
                />
              </Debounce>
              </div>
            </div>

            <div className="search-books-results">
               
          
            {renError}
              <ol className="books-grid">
            
              <BooksContainers
              book={results}
              onMoveBooks={onMoveBooks}
              />        
          

              </ol>
            </div>
          </div>
        
    )
}

}

export default SearchBooks