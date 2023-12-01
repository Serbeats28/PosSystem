import React from 'react'

export let PrintPage = React.forwardRef((props, ref) =>{
    let {cart, totalAmount} = props
    return(
        <div ref={ref} className='pt-5'>
            <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart ? cart.map((cartProduct, key)=><tr key={key}>
                                    <td>{cartProduct.id}</td>
                                    <td>{cartProduct.name}</td>
                                    <td>{cartProduct.price}</td>
                                    <td>{cartProduct.quantity}</td>
                                    <td>{cartProduct.totalAmount}</td>
                                    
                                </tr>):''
                            }
                        </tbody>
                    </table>
                    <h2 className="px-2">Total Amount: $ {totalAmount}</h2>
        </div>
    )
})