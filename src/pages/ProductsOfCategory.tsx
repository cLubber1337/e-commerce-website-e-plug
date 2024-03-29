import React, { useLayoutEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductsCategory, selectProductsCategory } from "features/categories"
import { useAppDispatch, useAppSelector } from "features/store"
import { getCategoryNameHelper } from "utils/productHelpers"
import { ProductsList } from "components/ProductsList"
import { Navbar } from "components/Navbar"
import { useMediaQuery } from "react-responsive"
import { CatalogModal } from "components/CatalogModal/CatalogModal"
import { Loader } from "components/Loader"

export const ProductsOfCategory = () => {
  const dispatch = useAppDispatch()
  const { categoryName } = useParams()
  const productsCategory = useAppSelector(selectProductsCategory)
  const [category, setCategory] = useState("")
  const isScreen765px = useMediaQuery({ query: "(max-width: 765px)" })

  console.log(productsCategory)
  console.log(categoryName)

  useLayoutEffect(() => {
    if (categoryName) {
      dispatch(getProductsCategory({ categoryName }))
      setCategory(getCategoryNameHelper(categoryName))
    }
  }, [dispatch, categoryName])

  if (Object.entries(productsCategory).length === 0) {
    return <Loader />
  }

  return (
    <div className="grid-container">
      <div className="grid-container__left">
        <Navbar />
      </div>
      <div className="grid-container__right">
        {isScreen765px && <CatalogModal />}
        <ProductsList category={category} products={productsCategory} />
      </div>
    </div>
  )
}
