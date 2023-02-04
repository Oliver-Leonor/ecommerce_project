import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'
import '../CSS/AppNavbar.css'

const AppNavbar = () => {
  const { user } = useContext(UserContext)

  const renderNavLinks = () => {
    if (user.id) {
      return (
        <>
          {user.isAdmin && (
            <Link to='/adminDashboard' className='navbar-item'>
              Admin Dashboard
            </Link>
          )}
          <Link to='/logout' className='navbar-item logout'>
            Logout
          </Link>
        </>
      )
    }
    return (
      <>
        <Link to='/login' className='navbar-item'>
          Login
        </Link>
        <Link to='/register' className='navbar-item'>
          Register
        </Link>
      </>
    )
  }

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-brand'>
          Digital Shop
        </Link>
        <div className='navbar-links'>
          <Link to='/' className='navbar-item'>
            Home
          </Link>
          <Link to='/products' className='navbar-item'>
            Products
          </Link>
          {renderNavLinks()}
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
