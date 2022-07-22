import React from 'react'
import "./LoadingSkeleton.css"

export const LoadingSkeleton = () => {
    return (
        <article className="skeletonContainer productContainer">
            <div className="productImgContainer">
                </div>
                <div className="productTitleContainer"></div>
                <div className="productPriceContainer">
                    <span className="productDiscountedPrice">.</span>
                </div>
                <div className="addToCartButtonSkeleton"></div>
            
        </article>
    )
}
