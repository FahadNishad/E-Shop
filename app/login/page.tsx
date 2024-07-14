
import React from 'react'
import FormWrap from '../components/FormWrap'
import LoginForm from './LoginForm'
import Container from '../components/Container'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Login =  async () => {

  const currenUser = await getCurrentUser()
  return (
    <Container>
    <FormWrap>
        <LoginForm currentUser ={currenUser}/>
    </FormWrap>
  </Container>
  )
}

export default Login