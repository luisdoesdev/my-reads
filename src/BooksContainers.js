import React, { Component } from 'react'
import PropTypes from 'prop-types'




class BooksContainers extends Component{


  //PropsTypes
  static propTypes = {
    book : PropTypes.array.isRequired,
    onMoveBooks: PropTypes.func.isRequired
  }

  
  render(){
   
    const {book, onMoveBooks} = this.props

    // I kept getting a bug where the first option of the value on select was not being input, decided to make a 
    // a "none" dummy option to work around it, this variable is to hide that dummy
    const hide = {
      display:"none", 
    }
    
    let image
    if (book.map((b)=> b.imageLinks)){
      image = 'yes'  
    }

    return(
              <div>
                    <ol className="books-grid">
       
        {book.map((b)=> (            
                      <li key={b.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:image==="yes" ? `url(${b.imageLinks.thumbnail})` : `url('http://via.placeholder.com/128x193?text=No%20Cover')` }}></div>
                            <div className="book-shelf-changer">
    
                              <select onChange={(e)=> onMoveBooks(b.id, e.target.value, this)} value={b.shelf}>
                                <option  value="none" disabled>Move to...</option>
                                <option style={hide} value="none"></option>
                                <option value="read" className={(b.shelf === 'read') ? "highlight": ""}> Read </option> 
                                <option value="currentlyReading" className={(b.shelf === 'currentlyReading') ? "highlight": ""}> Currently Reading </option>    
                                <option value="wantToRead" className={(b.shelf === 'wantToRead') ? "highlight": " "}> Want To Read </option>                            
                              </select>

                            </div>
                          </div>
                          <div className="book-title">{b.title}</div>
                          <div className="book-authors">{b.authors ? b.authors.join(', '): ''}</div> {/*If there is multiple authors to a books it sepperates them with commas*/}
                        </div>
                      </li>
              
                 ))}  
                    </ol>
                  </div>
                
    )
}

}

                                

                            
                              
export default BooksContainers