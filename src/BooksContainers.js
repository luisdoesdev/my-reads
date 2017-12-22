import React, { Component } from 'react'
import PropTypes from 'prop-types'



class BooksContainers extends Component{


  //PropsTypes
  static PropTypes = {
    book : PropTypes.array.isRequired,
    onMoveBooks: PropTypes.func.isRequired
  }



render(){
    const {book, onMoveBooks, onDelete} = this.props
    
    //Basic fix for the problem of the options
    let opts = []

    

    for(let i in book){
     
     
      let b = book[i]
      console.log(b)
    

      if (b.shelf === "read" ){

        opts = [
          {value:"read", title:" ✓ Read"},
          {value:"currentlyReading", title: "Currently Reading"},
          {value:"wantToRead", title: "Want To Read"} 
        ]
      }

       else if (b.shelf === "wantToRead"){

          opts = [
            {value:"read", title:" Read"},
            {value:"currentlyReading", title: "Currently Reading"},
            {value:"wantToRead", title: " ✓ Want To Read"} 
          ] 
        }
        
       else if (b.shelf === "currentlyReading"){

         opts = [
           {value:"read", title:" Read"},
           {value:"currentlyReading", title: " ✓ Currently Reading"},
           {value:"wantToRead", title: "Want To Read"} 
          ]     
        }
     
    
        else { 
          opts = [
            {value:"read", title:" Read"},
            {value:"currentlyReading", title: "Currently Reading"},
            {value:"wantToRead", title: "Want To Read"} 
                ] 

        }     
        
    
    
    }
 


    // I kept getting a bug where the first option of the value on select was not being input, decided to make a 
    // a "none" dummy option to work around it, this variable is to hide that dummy
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
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${b.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">

                                      
                              <select  onChange={(e)=> onMoveBooks(b.id, e.target.value, this)}>

                                <option  value="none" disabled>Move to...</option>
                                <option style={hide} value="none"></option>
                                {opts.map((o)=>(
                                  <option value={o.value}>{o.title}</option>
                                ))}

                            
                              
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