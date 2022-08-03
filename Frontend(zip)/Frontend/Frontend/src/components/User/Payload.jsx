
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";


function Payload() {
    const [product, setProduct] = useState({
        name: "React Course",
        price: 2000 * 100,
        productBy: "chessacademy"
    })

    const makePayment = (token) => {
        const body = {
            token,
            product
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch("http://localhost:5000/payment", {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        }).then((response)=>{
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <StripeCheckout
                name="Buy course"
                amount={product.price}
                currency="INR"
                token={makePayment}
                stripeKey="pk_test_51LPih9SIXs0VugHkigImUV9IwVOqMcd8RFEjcpTllmMmbTXJODxo4KO4IXtJwN7tbqkyYQyKNP8AIVp8ArVsQQjS00bI1KbwCr"

            >
                <button>Buy this course at {product.price / 100}</button>
            </StripeCheckout>

        </div>
    );
}
export default Payload;