import React from 'react'
import roundNumber from '../../../hooks/roundNumber'

export const ProductPrice = ({ price, discountedPrice, quantity, type, cartSidenav }) => {
    return (
        <>
            {type === "main" &&
                <div className="productPriceContainer">
                    {discountedPrice && <span className="productDiscountedPrice">${discountedPrice}</span>}
                    <span className="productRegularPrice">${price}</span>
                </div>
            }

            {type === "cart" &&
                <div className="detailPriceContainer cartPriceContainer">
                    {discountedPrice && (
                        <div className="detailDiscountContainer cartDiscountContainer">
                            {!cartSidenav ? <span className="detailDiscountedPrice cartDiscountedPrice">${roundNumber(discountedPrice * quantity)}</span> : <span className="detailDiscountedPrice cartDiscountedPrice">${roundNumber(discountedPrice)}</span>}

                            {!cartSidenav ? <span className="detailDiscount cartDiscount">-{roundNumber(((100 / discountedPrice) * price) - 100)}%</span> : <span className="detailDiscount cartDiscount">-{roundNumber(((100 / discountedPrice) * price) - 100)}%</span>}
                        </div>
                    )}

                    <div className="detailRegularContainer cartPriceContainer">
                        {!cartSidenav ? <span
                            className={
                                discountedPrice
                                    ? "detailRegularPrice cartRegularPrice"
                                    : "detailDiscountedPrice cartDiscountedPrice"
                            }>${roundNumber(price * quantity)}</span> : <span
                                className={
                                    discountedPrice
                                        ? "detailRegularPrice cartRegularPrice"
                                        : "detailDiscountedPrice cartDiscountedPrice"
                                }>${roundNumber(price)}</span>}
                    </div>
                </div>
            }

        </>
    )
}
