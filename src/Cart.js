import React from 'react'

function Cart (props) {
    let sumTotal = 0
    for (let book of props.books) {
        if (book.inCart) sumTotal += book.price
    }
    
    return (
        <div className='cart'>
        Search: <input type='text'/> 
            <button class ='go-button' type='submit' onClick={props.handleSubmit}>Go!</button>
       


        Cart total: ${sumTotal}
        <button>Checkout</button>
        </div>
    );
}

export default Cart