import React from 'react'
import { Link } from "react-router-dom"
import { AddToCartButton } from '../../AddToCartButton/AddToCartButton'

export const ProductImg = ({ product, type }) => {
    return (
        <div className={`productImgContainer ${type === "cart" ? 'cartImgContainer' : ''}`}>
            <Link to={`/details/${product._id}`} className={`productImgLink ${type === "cart" ? 'cartProductImgLink' : ''}`}><img className={`productImg ${type === "cart" ? 'cartImg' : ''}`}src={product.images[0].smallImg} loading="lazy"></img></Link>
            {type === "main" &&
                <AddToCartButton
                    buttonText=" + Carrito"
                    buttonType="mobile"
                    product={product}
                />
            }
        </div>
    )
}
