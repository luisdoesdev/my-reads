import React, { Component } from 'react'
import PropTypes from 'prop-types'



class BooksContainers extends Component{


  //PropsTypes
  static PropTypes = {
    book : PropTypes.array.isRequired,
    onMoveBooks: PropTypes.func.isRequired
  }



render(){
    const {book, onMoveBooks} = this.props

    // I kept getting a bug where the first option value on select was not being input, decided to make a 
    // a "none" summy option to work around it
    const hide = {
      display:"none", 
    }
   
    return(
              <div>
                    <ol className="books-grid">
       
        {book.map((b)=> (            
                      <li key={b.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select value={this.props.value} onChange={(e)=> onMoveBooks(b.id, e.target.value)}>
                                <option  value="none" disabled>Move to...</option>
                                <option style={hide} value="none"></option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{b.title}</div>
                          <div className="book-authors">{b.author}</div>
                        </div>
                      </li>
              
                 ))}  
                    </ol>
                  </div>
                
    )
}

}

export default BooksContainers