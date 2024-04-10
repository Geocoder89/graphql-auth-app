

import React, { useState } from 'react'
import AuthForm from './AuthForm'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN_USER } from '../graphql/mutations/Login'
import { GET_USER } from '../graphql/queries/getUser'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const [login] = useMutation(LOGIN_USER)
  const [errors, setErrors] = useState('')

  const navigate = useNavigate()   

  const {refetch: refetchUser} = useQuery(GET_USER)


  const onSubmit = async({email,password})=>{
    try {
     const {data }= await login({
        variables: {
          email,
          password
        }
      })

      const {token} = data.login

      localStorage.setItem('authToken', token)
      refetchUser()
      navigate('/dashboard')
     
    } catch (error) {
      setErrors(error.message)
      
    }
  }
  return (
    <div>
    <h3>Login</h3>
    <AuthForm errors={errors} onHandleSubmit={onSubmit}/>
    </div>
  )
}

export default LoginForm