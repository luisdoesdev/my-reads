import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksContainers from './BooksContainers'

class Shelf extends Component{

  //PropsTypes
  static propTypes = {
    book : PropTypes.array.isRequired,
    onMoveBooks: PropTypes.func.isRequired
  }


render(){
    const {book, onMoveBooks,title}=this.props
    console.log(book)

   
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title"> { title } </h2>
            <div className="bookshelf-books">
                <BooksContainers
                    book={book}
                    onMoveBooks={onMoveBooks}
                />

            </div>
        </div>
    )
}
}                      
export default Shelf