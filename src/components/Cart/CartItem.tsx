import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons/faSquarePlus"
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons/faSquareMinus"
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark"
import { useAppDispatch } from "features/store"
import { decQty, incQty, removeItem } from "features/cart"

type Props = {
  title: string
  price: number
  thumbnail: string
  count: number
  id: number
}

export const CartItem = ({ title, price, thumbnail, count, id }: Props) => {
  const dispatch = useAppDispatch()
  const handlerRemoveItem = () => {
    dispatch(removeItem({ id }))
  }
  const handlerIncQty = () => {
    dispatch(incQty({ id }))
  }
  const handlerDecQty = () => {
    dispatch(decQty({ id }))
  }

  return (
    <div className="cart-product">
      <div className="cart-product__img">
        <img src={thumbnail} alt="thumbnail" />
      </div>
      <div className="cart-product__title">{title}</div>
      <div className="cart-product__unit-price">${price}</div>
      <div className="cart-product__quantity">
        <FontAwesomeIcon
          icon={faSquareMinus}
          onClick={handlerDecQty}
          className="cart-product__quantity__icon"
        />
        <span>{count}</span>
        <FontAwesomeIcon
          icon={faSquarePlus}
          onClick={handlerIncQty}
          className="cart-product__quantity__icon"
        />
      </div>
      <div className="cart-product__total-price">
        <span>${price * count}</span>
      </div>
      <div className="cart-product__delete">
        <FontAwesomeIcon icon={faXmark} onClick={handlerRemoveItem} />
      </div>
    </div>
  )
}