import React from 'react'
import { Link } from "react-router-dom"
import "../../Product/Product.css"

export const ProductName = ({ _id, name, type, cartSidenav }) => {
    const styles = () => {
        if (type === "main"){
            return "productTitleContainer"
        } else if(type === "cart"){
            if(cartSidenav){
                return "addedToCartProductTitle sidebarDisplayed"
            } else {
                return "addedToCartProductTitle"
            }
        }
    }

    return (
                <Link to={`/details/${_id}`} className={styles()}>
                    {name}
                </Link>
    )
}
