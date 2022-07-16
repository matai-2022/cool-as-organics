import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getRecipes } from '../apis/recipes'

function Recipes() {
  const [recipes, setRecipes] = useState(null)

  const { ingredient } = useParams()

  useEffect(() => {
    getRecipes(ingredient)
      .then((recipes) => {
        setRecipes(recipes)
      })
      .catch((error) => console.error(error.message))
  }, [])

  return !recipes ? (
    <p> loading </p>
  ) : (
    <div>
      <ul>
        {recipes.results.map((item) => (
          <li key={item.id}>
            {item.name}
            <img src={item.thumbnail_url} alt={item.thumbnail_url_text} />
            <ul>
              {item.tags.map((tag) => {
                if (tag.type === 'dietary')
                  return <li key={tag.name}>{tag.name}</li>
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Recipes
