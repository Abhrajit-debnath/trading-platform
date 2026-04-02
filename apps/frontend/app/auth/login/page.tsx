import React from 'react'
import AuthForm from '../../src/components/ui/Auth/AuthForm.ui'

const Page = () => {
  return <AuthForm fields={["email", "password"]} state={"login"} />
}

export default Page
