import React, { useMemo,useCallback } from 'react'
import { GET_USER } from '../graphql/queries/getUser'
import { useMutation, useQuery } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import { LOG_OUT } from '../graphql/mutations/Logout'
const Header = () => {

  const {loading, data, refetch: refetchUser} = useQuery(GET_USER)
  const navigate = useNavigate()
  const [logout] =   useMutation(LOG_OUT, {
    update: (cache)=> {
      cache.writeQuery({
        query: GET_USER,
        data: {
          me: null
        }
      })
    }
  })

 


  const handleLogout = useCallback(async ()=> {

    try {
    await logout()

    localStorage.removeItem('authToken')

    refetchUser()
    navigate('/login')
    } catch (error) {
      console.error(error)
    }
    
  },[logout,refetchUser,navigate])

  const renderButtons = useMemo(()=> {
    if(loading) {
      return <div></div>
    }

  

    

 
   
    if(data && data.me) {
    
      
      return (
        
        <div>
        <li>Welcome {data.me.email}</li>
        
        <li><a href='#' onClick={handleLogout}>logout</a></li></div>)
    } else {
      return <div>
        <li>
        <Link to='/signup'>Sign up</Link>
        </li>
        <li>
        <Link to='/login'>Login</Link>
        </li>
      </div>
    }
  }, [loading,data,handleLogout])


  return (
    <nav>
      <div className='nav-wrapper'>
      <Link to='/' className='brand-logo left'>Auth App</Link>
      <ul className='right'>
      {renderButtons}
      </ul>
       
      </div>
    </nav>
  )
}

export default Header