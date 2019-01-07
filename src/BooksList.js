import React from 'react'
import axios from 'axios'
import Book from './Book'


class BooksList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            seeHidden: true,
            addFormHidden: true,
            searchTerm: '',

            addTitle: '',
            addSubtitle: '',
            addAuthor: '',
            addPublished: '',
            addPublisher: '',
            addPages: '',
            addWebsite: '',
            addPrice: '',
            addDescription: '',
            addId: ''
        }
    }
    componentDidMount = () => {
        this.getBooks()
    }
    
    getBooks = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/books`)
            .then(response => {
                this.setState({ books: response.data, seeHidden: true, 
                addTitle: '',
                addSubtitle: '',
                addAuthor: '',
                addPublished: '',
                addPublisher: '',
                addPages: '',
                addWebsite: '',
                addPrice: '',
                addDescription: '' } )
            })
            .catch(() => console.log(`you got caught!`))
            
    }

    addBook = async (id) => {
        axios.patch(`${process.env.REACT_APP_API_URL}/api/books/cart/add/${id}`)
            .then( () =>  this.getBooks() )
            .catch(() => console.log(`couldn't add the book`))
    }
    removeBook = async (id) => {
        axios.patch(`${process.env.REACT_APP_API_URL}/api/books/cart/remove/${id}`)
        .then( () => this.getBooks() )
        .catch(() => console.log('could not remove book'))
    }
    filterBookAuth = (author) => {
        let authorBooks = this.state.books.filter(book => book.author === author)
        this.setState({books: authorBooks, seeHidden: false})
    }
    filterBookTitle = (title) => {
        let titleBooks = this.state.books.filter(book => book.title === title)
        this.setState({books: titleBooks, seeHidden: false})
    }
    handleChange = (e) => {
        this.setState({
            [ e.target.name ]: e.target.value
        }) 
    }
    searchSubmit = (e) => {
        e.preventDefault()
        let foundBooks = this.state.books.filter(book =>
           book.author.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || book.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
        this.setState({books: foundBooks, seeHidden: false})
    }
    cartTotal = () => {
        let sumTotal = 0
        for (let book of this.state.books) {
            if (book.inCart && Number(book.price)) sumTotal += book.price
        }
        return sumTotal
    }
    createNewBook = (e) => {
        e.preventDefault()
        this.setState({addFormHidden: true})
        axios.post(`${process.env.REACT_APP_API_URL}/api/books`, 
        {title: this.state.addTitle,
        subtitle: this.state.addSubtitle,
        author: this.state.addAuthor,
        published: this.state.addPublished,
        publisher: this.state.addPublisher,
        pages: this.state.addPages,
        website: this.state.addWebsite,
        price: this.state.addPrice,
        description: this.state.addDescription })
        .then(() => this.getBooks())
        .catch(() => console.log(`couldn't create`))
    }
    openEdit = (book) => {
        this.setState({     
            addTitle: book.title,
            addSubtitle: book.subtitle,
            addAuthor: book.author,
            addPublished: book.published,
            addPublisher: book.publisher,
            addPages: book.pages,
            addWebsite: book.website,
            addPrice: book.price,
            addDescription: book.description,
            addFormHidden: false,
            addId: book.id
           
        }) 
    }
    completeEdit = (e) => {
        e.preventDefault()
        this.setState({addFormHidden: true})
        axios.put(`${process.env.REACT_APP_API_URL}/api/books/${this.state.addId}`, 
        {title: this.state.addTitle,
        subtitle: this.state.addSubtitle,
        author: this.state.addAuthor,
        published: this.state.addPublished,
        publisher: this.state.addPublisher,
        pages: this.state.addPages,
        website: this.state.addWebsite,
        price: this.state.addPrice,
        description: this.state.addDescription,
         })
        .then(() => this.getBooks())
        .catch(() => console.log(`edit didn't work`))
    }
    destroyBook = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/books/${id}`)
        .then(() => this.getBooks())
        .catch(() => console.log('could not delete'))

    }
    clearForm = () => {
        this.setState({
            addTitle: '',
            addSubtitle: '',
            addAuthor: '',
            addPublished: '',
            addPublisher: '',
            addPages: '',
            addWebsite: '',
            addPrice: '',
            addDescription: '' } )
    }
    checkOut = () => {
        if (this.cartTotal() > 0) {
            for (let book of this.state.books) {
                this.removeBook(book.id)
            }
            alert(`Your books are totally on the way! $${this.cartTotal()} has been taken from you.`)
        } else{
            alert(`Please add things to your cart before you check out; it is the way of things.`)
        }
    }
 
    render() {
        return (
           

            <div align='center'>
                <div className='cart'>
                    Search: <input type='text' name='searchTerm' className='search-bar' onChange={this.handleChange}/> 
                    <button className ='go-button' type='submit' onClick={this.searchSubmit}>Go!</button>
                    Cart total: ${this.cartTotal()}
                    <button onClick = {this.checkOut}>Checkout</button>
                </div>
                <h1>Welcome to I Am Not a Book!</h1>
                <h3>A totally on-the-level bookstore.</h3> 
                <h2>Spiro's Picks of the Month:</h2>
                <br></br>
                {
                    this.state.addFormHidden ? 
                    <span>Don't like what you see? <button onClick={() => { this.setState({addFormHidden: false}); this.clearForm()} }>Add a Book!</button>
                    </span> 
                    : 
                    <span>Whatever you want! We'll stock it immediately. <button onClick={() => { this.setState({addFormHidden: true}); this.clearForm()} }>Cancel</button>
                    </span> 
                }
                <div className={this.state.addFormHidden ? 'hidden' : ''}>
                    
                    <form className='addForm'>
                        <table>
                        <tbody>  
                            <tr>
                                <td>
                                    <label for='addTitle'>Title: </label>
                                    <br></br>
                                    <input onChange={this.handleChange} type='text' name='addTitle' placeholder='Title' value={this.state.addTitle}/> <br></br>
                                    <label for='addAuthor'>Author: </label>    <br></br>
                                    <input onChange={this.handleChange} type='text' name='addAuthor' placeholder='Author' value={this.state.addAuthor}/> 
                                    <br></br>
                                    <label for='addSubtitle'>Subtitle: </label>    <br></br>
                                    <input onChange={this.handleChange} type='text' name='addSubtitle' placeholder='Subtitle'value={this.state.addSubtitle}/> <br></br>
                                    <label for='addPages'>Pages: </label>    <br></br>
                                    <input onChange={this.handleChange} type='text' name='addPages' placeholder='Pages' value={this.state.addPages}/>
                                    <br></br>
                                </td>
                                <td>
                                    <label for='addPrice'>Price:</label>    <br></br>
                                    <input onChange={this.handleChange} type='text' name='addPrice' placeholder='Price' value={this.state.addPrice}/><br></br>
                                    <label for='addPublished'>Published: </label>    <br></br>
                                    <input onChange={this.handleChange} type='text' name='addPublished' placeholder='Published' value={this.state.addPublished}/>
                                    <br></br>
                                    <label for='addPublisher'>Publisher: </label>  <br></br>
                                    <input onChange={this.handleChange} type='text' name='addPublisher' placeholder='Publisher' value={this.state.addPublisher}/>
                                    <br></br>
                                   
                                 
                                    <label for='addWebsite'>Website: </label>    <br></br>
                                    <input onChange={this.handleChange} type='text-area' name='addWebsite' placeholder='Website' value={this.state.addWebsite}/>
                                </td>
                                <td>
                                   
                                    <label for='addDescription'>Description: </label>    <br></br>
                                    <textarea onChange={this.handleChange} rows='12' name='addDescription' placeholder='Description' value={this.state.addDescription}/><br></br>
                                    
                                { this.state.addTitle ? 
                                    <input onClick={this.completeEdit} type='submit' value='Submit Changes' />
                                    : 
                                    <input onClick={this.createNewBook} type='submit' value='Add Book' />
                                }       
                                </td>
                            </tr>
                        </tbody>  
                        </table>
                       
                    </form>                    

                </div>
                {/* end of conditional add form */}
                
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
                            inCart={book.inCart}
                            description={book.description}
                            subtitle={book.subtitle}
                            pages={book.pages}
                            publisher={book.publisher}
                            published={book.published}
                            addBook={() => this.addBook(book.id)}
                            removeBook={() => this.removeBook(book.id)}
                            filterBookAuth={() => this.filterBookAuth(book.author)}
                            filterBookTitle={() => this.filterBookTitle(book.title)}
                            openEdit={() => this.openEdit(book)}
                            destroyBook={() => this.destroyBook(book.id)}
                            key={book.id}
                        /> 
                       );
                    })
                }
                </tbody>
                </table>
                <h3 onClick={() =>  this.getBooks()}  className={this.state.seeHidden ? 'hidden' : ''}>All Books</h3>

            </div>
        )
    }
}

export default BooksList