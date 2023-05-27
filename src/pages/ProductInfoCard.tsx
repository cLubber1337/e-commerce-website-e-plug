import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "features/store"
import { getSingleProduct, selectSingleProduct } from "features/products"
import { CustomButton } from "components/CustomButton"
import { Link, useParams } from "react-router-dom"
import { getCategoryNameHelper, getOldPriceHelper, getPercentHelper } from "utils/productHelpers"
import { addItem, decQty, incQty, selectCartItems } from "features/cart"
import { PATHS } from "utils/paths"
import { CartItemType } from "types/cart-types"

const ProductInfoCard = () => {
  const dispatch = useAppDispatch()
  const id = Number(useParams().id)
  let [qty, setQty] = useState(1)
  const cartItems: CartItemType[] = useAppSelector(selectCartItems)

  const currentItemInCart = cartItems.find((item) => item.id === id)

  useEffect(() => {
    if (currentItemInCart) {
      setQty(currentItemInCart.count)
    }
    dispatch(getSingleProduct(id))
  }, [dispatch, id])

  const { title, description, thumbnail, rating, category, price, discountPercentage, brand } =
    useAppSelector(selectSingleProduct) || {}

  const discount = getPercentHelper(discountPercentage)
  const oldPrice = getOldPriceHelper(price, discount)
  const categoryName = getCategoryNameHelper(category)

  const handlerAddToCart = () => {
    const item = {
      id,
      title,
      price,
      thumbnail: thumbnail || "",
      count: qty,
    }
    dispatch(addItem({ item }))
  }
  const handlerIncQty = () => {
    if (currentItemInCart) {
      dispatch(incQty({ id }))
    }
    setQty(++qty)
  }
  const handlerDecQty = () => {
    if (currentItemInCart) {
      dispatch(decQty({ id }))
    }
    if (qty > 1) setQty(--qty)
  }

  return (
    <section className="product-info-section">
      <div className="product-info-section__grid">
        {/*---------------IMAGES-------------------*/}
        <div className="product-info__images">
          <img src={thumbnail} alt={thumbnail} />
        </div>
        {/*---------------DESCRIPTION-------------------*/}
        <div className="product-info">
          <h1 className="product-info__title">{title}</h1>
          <p className="product-info__description">{description}</p>
          <div className={"product-info__rbc"}>
            <span className="product-info__rbc__item">
              <span>Rating</span>: {rating}
            </span>

            <span className="product-info__rbc__item">
              <span>Brand</span>: {brand}
            </span>

            <span className="product-info__rbc__item">
              <span>Category</span>: {categoryName}
            </span>
          </div>
          {/*----------------PRICE-------------------*/}
          <div className="product-info__price">
            <span className={"product-info__price__old"}>${oldPrice}</span>
            <p>
              <span className="product-info__price__new">${price}</span>
              <span className="product-info__price__discount">-{discount}%</span>
            </p>
          </div>
          {/*----------------QUANTITY-------------------*/}
          <div className="product-info__quantity">
            <span className="product-info__quantity__label">Quantity:</span>
            <button className="product-info__quantity__btn" onClick={handlerDecQty}>
              -
            </button>
            <span className="product-info__quantity__qty">{qty}</span>
            <button className="product-info__quantity__btn" onClick={handlerIncQty}>
              +
            </button>
          </div>
          {/*----------------ACTIONS-------------------*/}

          <div className="product-info__actions">
            {currentItemInCart ? (
              <Link to={PATHS.CART}>
                <CustomButton
                  title="In cart"
                  onClick={() => null}
                  size="-large"
                  color="-green"
                ></CustomButton>
              </Link>
            ) : (
              <CustomButton
                title="Add to cart"
                onClick={handlerAddToCart}
                size="-large"
                color="-base-color"
                icon={["fas", "cart-plus"]}
              ></CustomButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductInfoCard
