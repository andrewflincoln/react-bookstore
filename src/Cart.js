import React from 'react'

function Cart (props) {
    let sumTotal = 0
    for (let book of props.books) {
        if (book.inCart) sumTotal += book.price
    }
    
    return (
        <div className='cart'>
        Search: <input type='text'/> 
        Cart total: ${sumTotal}
        <button>Checkout</button>
        </div>
    );
}

export default Cart