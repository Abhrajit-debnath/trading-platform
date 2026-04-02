import React from 'react'
import AuthForm from '../../src/components/ui/Auth/AuthForm.ui'

const Page = () => {
  return <AuthForm fields ={["email","binance_api_Key","binance_secret_Key","password"]} state={"register"}/>
}

export default Page
