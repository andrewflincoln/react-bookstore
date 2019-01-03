import React from 'react'


function Book ({title, author, price, addBook}) {
    return (
        <tr>
          
                <td className='title'>{title}</td>
                <td>{author}</td>
                <td>${price}</td>
                 <td>
                    <button onClick={addBook}>Add to Cart</button>
                </td>
           
        </tr>
    )
}


export default Book