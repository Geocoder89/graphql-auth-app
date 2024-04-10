import React from 'react'
import Header from './Header'
import {BrowserRouter as Router } from 'react-router-dom'
const Layout = ({children}) => {
  return (
    
        <Router>
    <Header/>
    <div className='container'>
    {children}
    </div>
   
    </Router>
    
  
  )
}

export default Layout