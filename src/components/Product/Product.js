import React from "react"
import { Link } from "react-router-dom"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import "../Product/Product.css"
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import AppContext from "../../context/AppContext"
import { useProducts } from "../../hooks/queries/useProducts"
import { ProductName } from "./ProductName/ProductName"
import { ProductImg } from "./ProductImg/ProductImg"
import { ProductPrice } from "./ProductPrice/ProductPrice"
import { LoadingSkeleton } from "../LoadingSkeleton/LoadingSkeleton"

export const Product = ({ slides = 4, cartFormat, cartSidenav, cartProduct, category, product }) => {
    const { data, loading } = useProducts()
    const [products, setProducts] = React.useState()
    const { updateQuantity, removeFromCart } = React.useContext(AppContext)

    const handleQuantity = (payload, symbol) => {
        updateQuantity(payload, symbol)
    }

    const handleRemove = (id) => {
        removeFromCart(id)
    }

    React.useEffect(() => {
        if (!loading) {
            if (product) {
                setProducts(product)
            } else if (data) {
                if (!category) {
                    setProducts(data.allProducts)
                } else {
                    if (category === 50) {
                        setProducts(data.allProducts.filter(x => x.discountedPrice))
                    } else {
                        setProducts(data.allProducts.filter(x => x.category.some(e => e === category)))
                    }
                }
            }
        }

    }, [loading])

    const settings = {
        dots: false,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesToShow: slides,
        slidesToScroll: slides,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: slides - 1,
                    slidesToScroll: slides - 1
                }
            },
            {
                breakpoint: 600,
                settings: "unslick"
            }
        ]
    };

    return (
        <>   
            { (!cartFormat && loading) && <Slider {...settings}>
                    <LoadingSkeleton></LoadingSkeleton>
                    <LoadingSkeleton></LoadingSkeleton>
                    <LoadingSkeleton></LoadingSkeleton>
                    <LoadingSkeleton></LoadingSkeleton>
                </Slider>
            }
                
            {(!cartFormat && !loading) && <Slider {...settings}>

                {products && products.map(product => {
                    return <article
                        className="productContainer"
                        key={product._id}>

                        <ProductImg
                            product={product}
                            type="main"
                        />

                        <ProductName
                            _id={product._id}
                            name={product.name}
                            type="main"
                        />

                        <ProductPrice
                            price={product.price}
                            discountedPrice={product.discountedPrice}
                            quantity={product.quantity}
                            type="main"
                        />

                        <AddToCartButton
                            buttonText="Agregar al Carrito"
                            product={product}
                        />
                    </article>
                })
                }

            </Slider>
            }

            {(cartFormat && cartProduct) && <article
                className="productContainer cartProductContainer"
                key={cartProduct._id}>

                <ProductImg
                    product={cartProduct}
                    type="cart"
                />

                <div className="cartProductInfo">
                    <div className="cartProductTitle">
                        <ProductName
                            _id={cartProduct._id}
                            name={cartProduct.name}
                            type="cart"
                            cartSidenav={cartSidenav}
                        />

                        {!cartSidenav && <div
                            className="removeProductIcon"
                            onClick={() => handleRemove(cartProduct._id)}
                        >X</div>
                        }

                    </div>

                    <ProductPrice
                        price={cartProduct.price}
                        discountedPrice={cartProduct.discountedPrice}
                        quantity={cartProduct.quantity}
                        type="cart"
                    />

                    {!cartSidenav && <div className="quantityContainer">
                        <button
                            disabled={cartProduct.quantity === 1}
                            onClick={() => handleQuantity(cartProduct, "-")}
                        >-</button>
                        <input type="text" className="quantityInput" readOnly value={cartProduct.quantity}></input>
                        <button
                            disabled={cartProduct.quantity > 8}
                            onClick={() => handleQuantity(cartProduct, "+")}
                        >+</button>
                    </div>
                    }
                </div>
            </article>
            }
        </>
    );
}