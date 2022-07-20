import React, {useState, useEffect} from 'react'
import{ Link} from 'react-router-dom'


const menu = [
  {name: 'Home', route: '/'}, 
  {name: 'Add', route: '/products/add'},
  {name: 'Snap', route: '/products/add/photo'},
  {name: 'View', route: '/products/view'},
  {name: 'Stats', route: '/products/stats'}]

function Nav() {
  const [activeTab, setActiveTab] = useState('')

  return (
    <div className='flex justify-between font-medium text-black bg-white px-4 pb-2'>
    
    {menu.map(item => { return (
      <div key={item.name} className={`${item.name === activeTab && 'border-b-2 border-lime-400'} flex flex-row justify-center py-4 w-1/5`}>
    <Link to={item.route}>
      <button onClick={() => {setActiveTab(item.name)}} type='button' className='font-medium '>{item.name}</button>
    </Link>
    </div>
    )})}
    </div>
  )
}

export default Nav
