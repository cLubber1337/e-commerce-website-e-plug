import React from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "features/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { selectNamesCategories } from "features/categories"
import { ICONS_FOR_NAVBAR } from "utils/constants"
import { getCategoryNameHelper } from "utils/productHelpers"
import { PATHS } from "utils/paths"

export const Navbar = () => {
  const categories = useAppSelector(selectNamesCategories)

  return (
    <aside className={"navbar"}>
      <ul className={"navbar__items"}>
        {categories &&
          categories.map((categoryName, index) => (
            <li className={"navbar__items__item"} key={categoryName}>
              <Link className={"navbar__items__item-link"} to={`${PATHS.CATEGORY}/${categoryName}`}>
                <span className={"navbar__items__item-icon"}>
                  <FontAwesomeIcon icon={ICONS_FOR_NAVBAR[index]} />
                </span>
                {getCategoryNameHelper(categoryName)}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  )
}
