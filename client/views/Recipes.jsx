import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getRecipes } from '../apis/recipes'

function Recipes() {
  const [recipes, setRecipes] = useState(null)

  const { ingredient } = useParams()

  useEffect(() => {
    getRecipes(ingredient)
      .then((data) => {
        setRecipes(data.results)
      })
      .catch((error) => console.error(error.message))
  }, [])

  return !recipes ? (
  <p> loading </p>
  ) : (
  <>
  <h1 className='my-4 text-3xl text-center'>Recipes</h1>

  <div className='h-screen flex flex-col items-center bg-zinc-50'>

  {recipes.map((recipe) => (
    <a key={recipe.id} href='https://www.ubereats.com' className='block w-11/12'>
      <div className='border rounded border-zinc-200 bg-white mt-4'>
        <img src={recipe.thumbnail_url} alt={recipe.thumbnail_url_text} className='h-48 w-full object-cover' />
        <div className='px-4 py-4'>
          <h2 className='text-xl font-medium'>{recipe.name}</h2>
          <ul className='mt-4 flex flex-row flex-wrap'>
          {recipe.tags.filter(tag => tag.type === 'dietary').map(tag => {
            return <li key={tag.name} className='mr-1 mb-1 px-1 py-1 border rounded border-zinc-400 text-small text-zinc-400 leading-none'>{tag.name}</li>
          })}
          </ul>
        </div>
      </div>
    </a>
  ))}

  </div>
  </>
  )
}

export default Recipes
