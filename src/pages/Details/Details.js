import React from 'react'
import { BiShareAlt } from "react-icons/bi"
import { MdNavigateBefore } from "react-icons/md"
import { ProductList } from '../../components/ProductList/ProductList'
import { Product } from '../../components/Product/Product'
import { Link, useNavigate, useParams } from "react-router-dom"
import AppContext from '../../context/AppContext'
import { AddToCartButton } from '../../components/AddToCartButton/AddToCartButton'
import { useProducts } from '../../hooks/queries/useProducts'
import { useFindProduct } from "../../hooks/queries/useFindProduct"
import roundNumber from '../../hooks/roundNumber'

import Slider from "react-slick"
import "./Details.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { DetailSkeleton } from '../../components/DetailSkeleton/DetailSkeleton'


export const Details = () => {

    const { addToCart } = React.useContext(AppContext)
    const handleClick = (product) => {
        addToCart(product)
    }
    const { id } = useParams()

    const { data, loading } = useFindProduct(id)

    const allProducts = useProducts()
    const navigate = useNavigate()
    const onDetailCollapsibleButtonClick = () => {
        setShowDetailCollapsible(!showDetailCollapsible)
    }
    const onModelCollapsibleButtonClick = () => {
        setShowModelCollapsible(!showModelCollapsible)
    }
    const [showDetailCollapsible, setShowDetailCollapsible] = React.useState(true)
    const [showModelCollapsible, setShowModelCollapsible] = React.useState(true)
    const [number, setNumber] = React.useState(1)
    const quantity = [
        1, 2, 3, 4, 5, 6, 7, 8, 9
    ]
    const [productDetail, setProductDetail] = React.useState()
    const [relatedProducts, setRelatedProducts] = React.useState([])
    const [models, setModels] = React.useState([])
    const settings = {
        dots: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };

    React.useEffect(() => {
        if (data && allProducts.data) {
            const result = data.findProduct
            setProductDetail(result)
            setRelatedProducts(allProducts.data.allProducts.filter(x => x.category.some(z => result.category.includes(z))))
            let modelsArr = []
            if (result.models.variants) {
                const resultModels = Object.entries(result.models.variants)
                const resultModelsValues = Object.entries(resultModels)
                if (resultModelsValues[0]) {

                    for (let [key, value] of Object.entries(resultModelsValues)) {
                        let result = allProducts.data.allProducts.filter(x => x._id === value[1][1]._id)
                        if (result) {
                            modelsArr.push(result[0])
                        }
                    }
                }
            }
            setModels(modelsArr)
        }
    }, [loading, id, allProducts])

    return (
        <div className="mainContent mainDetailContent">
            <div className="listTitleContainer detailTitleContainer">
                <a onClick={() => navigate(-1)}>
                    <MdNavigateBefore className="" size="16" color="##3E70AC" />
                    Regresar
                </a>
                <a href="#">
                    <BiShareAlt className="" size="20" fill="#444444" />
                </a>
            </div>

            { loading && <DetailSkeleton /> }
            
            {productDetail && (
                <article
                    className="productContainer detailContainer"
                    key={productDetail._id}
                >
                    <Slider {...settings} className="detailImgContainer">
                        <img className="detailImg" src={productDetail.images[0].largeImg} key={productDetail._id} loading="lazy"></img>
                    </Slider>

                    <div className="detailInfoContainer">
                        <h1 className="detailName">{productDetail.name}</h1>

                        <div className="detailPriceContainer">
                            {productDetail.discountedPrice && (
                                <div className="detailDiscountContainer">
                                    <span className="detailDiscount">
                                        -{roundNumber((((100 / productDetail.discountedPrice) * productDetail.price) - 100), 0)}%
                                    </span>
                                    <span className="detailDiscountedPrice">
                                        ${productDetail.discountedPrice}
                                    </span>
                                </div>
                            )}

                            <div className="detailRegularContainer">
                                {productDetail.discountedPrice && (
                                    <span className="detailRegularSpan">Precio regular:</span>
                                )}
                                <span
                                    className={
                                        productDetail.discountedPrice
                                            ? "detailRegularPrice"
                                            : "detailDiscountedPrice"
                                    }
                                >
                                    ${productDetail.price}
                                </span>
                            </div>
                        </div>

                        <div className="separator"></div>

                        {models > 0 && (
                            <section className="modelsContainer">
                                <button
                                    type="button"
                                    className="detailModelButton"
                                    onClick={onModelCollapsibleButtonClick}
                                >
                                    <span className="">{productDetail.models.type}:</span><span>{productDetail.model}</span> <span></span>
                                </button>

                                <div className={showModelCollapsible ? 'modelCollapsibleContentShow' : 'modelCollapsibleContentHidden'}>
                                    {models.map((model) => {
                                        return (
                                            <Link
                                                to={`/details/${model._id}`}
                                                key={model._id}
                                                className=""
                                            >
                                                <article className={`modelContent ${productDetail._id === model._id ? 'selectedModel' : ''}`}>
                                                    <span className="modelModel">
                                                        {model.model}
                                                    </span>
                                                    {model.discountedPrice && <span className="modelPrice">
                                                        {model.discountedPrice}
                                                    </span>}
                                                    {!model.discountedPrice && <span className="modelPrice">
                                                        {model.price}
                                                    </span>}
                                                </article>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        <div className="detailsCollapsibleContainer">
                            <button
                                type="button"
                                className="detailCollapsibleButton"
                                onClick={onDetailCollapsibleButtonClick}
                            >
                                <span>Funciones y detalles</span> <span></span>
                            </button>
                            <div
                                className={`detailCollapsibleContentHidden ${showDetailCollapsible ? "detailCollapsibleContentShow" : ""
                                    }`}
                            >
                                <ul>
                                    {productDetail.features.map((feature, index) => {
                                        return <li key={index}>• {feature}</li>
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="fixedDetailButtonsContainer">
                            <select className="quantityDetails"
                                onChange={(e) => setNumber(e.target.value)}>
                                {quantity.map((quantity) => {
                                    return (
                                        <option value={quantity} key={quantity}>
                                            {quantity}
                                        </option>
                                    )
                                })}
                            </select>
                            <AddToCartButton
                                onClick={() => handleClick(productDetail)}
                                product={productDetail}
                                buttonText="Agregar al Carrito"
                                detailButton={true}
                                quantity={number}
                            />
                        </div>
                    </div>
                </article>
            )}

            {relatedProducts.length > 0 && <ProductList listTitle="Productos relacionados 🌟">
                <Product
                    slides={4}
                    product={relatedProducts}
                />
            </ProductList>}
        </div>
    );
}
