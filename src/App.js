import { func } from "prop-types"
import React from "react"
// import * as BooksAPI from './BooksAPI'
// import './App.css'
import { Nav, Form } from "react-bootstrap"

// import Shelf from './Shelf'
// import SearchBooks from './SearchBooks'
// import { Route, Link } from 'react-router-dom'


//

function whenSubmitted(e){
  e.preventDefault();
  let value = e
  console.log(value)
}

function SearchBar(){
  return <Form onSubmit={whenSubmitted}>
      <Form.Group controlId="searchForm">
        <Form.Label>search for books</Form.Label>
        <Form.Control type="text" placeholder="search" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
</Form>
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav
          activeKey="/home"
          onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
          <SearchBar />
        </Nav>
      </div>
    )
  }
}

export default App

/*
class BooksApp extends React.Component {
  state = {
    books:[],
    error:'',
    ready:false
  }


  // call The API
componentDidMount(){
  BooksAPI.getAll()
  .then((books)=>{
    this.setState({books})
  })
  .catch((error)=>{
    this.setState({error})
  })
  setTimeout(()=>{ this.setState({ready:true}) }, 1500);
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
    
    const { books, ready } = this.state

    //Sepparate the books and sort them by shelfs    
    

    //shelves
    const read = books.filter(book => book.shelf === "read" )
    const wantToRead = books.filter(book => book.shelf === "wantToRead" )
    const currentlyReading  = books.filter(book => book.shelf === "currentlyReading" )

    
    

    return (
      <div className="app" >
         
          <Route path="/" exact render={()=> (
     
          
            <div className="list-books">
              
              <div className="list-books-title">
                

                <h1>{ready? "Reads" : 'Loading'}</h1>
                
              </div>
             
              {ready? (
              <div className="list-books-content">

             
      
            <Shelf
              title={"Read"}
              book={read}
              onMoveBooks={this.booksMove}
            />

          
              <Shelf
              title={"Currently Reading"}
              book={currentlyReading}
              onMoveBooks={this.booksMove}
            />

         
              <Shelf
              title={"Want To Read"}
              book={wantToRead}
              onMoveBooks={this.booksMove}
              />
              </div>): "" }  
             
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
*/
