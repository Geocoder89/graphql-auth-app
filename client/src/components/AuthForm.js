

import React, { useState } from 'react'


const AuthForm = ({onHandleSubmit,errors}) => {

  const [email, setEmail] = useState('')
  const [password,setPassword ] = useState('')


  const onSubmit = (e)=> {
    e.preventDefault()

    onHandleSubmit({email,password})
    setEmail('')
    setPassword('')
  }

 
  
  return (

    <div className='row'>
    
    <form className='col s6' onSubmit={onSubmit}>
    <div className='input-field'>
    
    <input placeholder="email" type='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
    
    </div>
    <div className='input-field'>
    
    <input placeholder='password' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
    </div>

      <div className='errors'>
      {errors}
      </div>
     
      <button className='btn' type='submit'>Submit</button>
      
    </form>
    </div>
  )
}

export default AuthForm

