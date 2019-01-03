import React from 'react'
import axios from 'axios'
import Book from './Book'
import Cart from './Cart'

class BooksList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
        }
    }
    componentDidMount = () => {
        this.getBooks()
    }
    
    getBooks = async () => {

        axios.get(`http://localhost:8082/api/books`)
            .then(response => {
                this.setState({ books: response.data } )
                console.log(this.state.books)
            })
            .catch(console.log(`you got caught!`))
    }

    addBook = async (id) => {
        axios.patch(`http://localhost:8082/api/books/cart/add/${id}`)
            .then(this.getBooks())
            .catch(`couldn't add the book`)
    }
        
    render() {
        return (
            <div align='center'>
                <Cart
                    books={this.state.books}
                    checkOut={() => this.checkOut()}
                />    
                <h1>Welcome to I Am Not a Book!</h1>
                <h3>A totally on-the-level bookstore.</h3> 
                <h2>Spiro's Picks of the Month:</h2>
                
                <table className='book-info'>
                <tbody>
                <tr className='table-header'>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Price</td>
                </tr>
                {      
                    this.state.books.map(book => {
                        return (                      
                            <Book
                            title={book.title}
                            author={book.author}
                            price={book.price}
                            addBook={() => this.addBook(book.id)}
                        /> 
                       );
                    })
                }
                </tbody>
                </table>

            </div>
        )
    }//render
}

export default BooksList