import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios"
import {toast} from "react-toastify"
import { PrintPage } from "../printingPages/PrintPage";
import {useReactToPrint} from "react-to-print"
let PosPage = () => {

    const [product, setProduct] = useState([]);
    var [isLoading, setIsLoading] = useState(false)
    let [cart, setAddCart] = useState([])
    let [totalAmt, setTotalAmt] = useState(0)

    let toastOptions ={
        autoClose : 400,
        pauseHover: true
    }
    let fetchProduct = async () => {
        setIsLoading(true)
        let result = await axios.get('http://localhost:8080/product')
        setProduct(await result.data)
        setIsLoading(false)
    }


    useEffect(() => {
        fetchProduct()
    }, [])

    let addProductToCart = async (product) => {
        let findProductInCart = await cart.find(i => {
            return i.id === product.id
        })

        if(findProductInCart) {
            let newCart = [];
            let newItem;

            cart.forEach(cartItem => {
                if (cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem)
                } else {
                    newCart.push(cartItem)
                }
            })
            setAddCart(newCart)
            toast(`added ${newItem.name} to cart`, toastOptions )

        } else {
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price
            }
            setAddCart([...cart, addingProduct])
            toast(`Added ${product.name} to cart`, toastOptions )
        }
    }
    
    let removeProduct = async(product) =>{
        let newCart = cart.filter(cartItem=>cartItem.id !== product.id)
        setAddCart(newCart)
    }

    useEffect(()=>{
        let newTotalAmount = 0;
        cart.forEach(cartNew =>{
            newTotalAmount = newTotalAmount + parseInt(cartNew.totalAmount)
        })

        setTotalAmt(newTotalAmount)
    },[cart])


  let componentRef = useRef()
   
  let handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  })

  let handlePrint = () =>{
    handleReactToPrint()
  }

    return (
        <NavBar>
            <div className="row">
                <div className="col-lg-8">
                    {isLoading ? 'Loading' : <div className="row">
                        {
                            product.map((product, key) => (
                                <div className="col-lg-4" key={key}>
                                    <div className="pos-item px-3 text-center border mb-2" onClick={() => addProductToCart(product)}>
                                        <p>{product.name}</p>
                                        <img src={product.image} alt={product.name} className="img-fluid mb-2" />
                                        <p>$ {product.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    }

                </div>
                <div className="col-lg-4">
                    <div style={{display:"none"}}>
                        <PrintPage cart={cart} totalAmount={totalAmt} ref={componentRef} />
                    </div>
                    <table className="table table-responsive table-dark table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Action</th>
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
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={()=>removeProduct(cartProduct)}>Remove</button>
                                    </td>
                                </tr>):'no item'
                            }
                        </tbody>
                    </table>
                    <h2 className="px-2">Total Amount: $ {totalAmt}</h2>
                    <div className="mt-3">
                    { totalAmt !== 0 ? <div>
                        <button className="btn btn-primary" onClick={handlePrint}>Pay now</button>
                    </div> :`Please add to cart`

                    }
                </div>
                </div>
             
            </div>
        </NavBar>
    )
}
export default PosPage;