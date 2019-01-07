import React from 'react'


function Book(props) {
    return (
            <tr >
                <td className='title' onClick={props.filterBookTitle}>{props.title}</td>
                <td onClick={props.filterBookAuth}>{props.author}</td>
                <td>${props.price}</td>
                    <td>
                    {
                        props.inCart ? <button onClick={props.removeBook}>Remove from Cart</button> : <button onClick={props.addBook}>Add to Cart</button>
                    }
                </td>     
                <td><button onClick={props.openEdit}>Detail/Update</button></td>
                
                <td><button onClick={props.destroyBook}>Destroy</button></td>   
            </tr>
    )
}

export default Book