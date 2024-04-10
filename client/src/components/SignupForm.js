import React, { useState } from 'react'
import AuthForm from './AuthForm'
import { useMutation, useQuery } from '@apollo/client'
import { SIGN_UP_MUTATION } from '../graphql/mutations/Signup'
import { GET_USER } from '../graphql/queries/getUser'
import {useNavigate} from 'react-router-dom'
const SignupForm = () => {

  const [signup] = useMutation(SIGN_UP_MUTATION)
  const {refetch: refetchUser} = useQuery(GET_USER)
  const [errors,setErrors] = useState('')
  const navigate = useNavigate()


  const onSubmit = async({email,password})=> {
    try {
      const {data} = await signup({
        variables: {
          email,
          password
        }
      })
      const {token} = data.signup
      localStorage.setItem('authToken',token)
      refetchUser()
      navigate('/dashboard')
    } catch (error) {
      setErrors(error.message)
    }
  }
  return (
    <div>
    <h3>Sign up</h3>
    <AuthForm errors={errors} onHandleSubmit={onSubmit}/>
    
    </div>
  )
}

export default SignupForm