import React from 'react'
import Link from 'next/link'
import FormSection from './FormSection.ui'

export type AuthFormProps = {
  fields: string[],
  state: string
}

const AuthForm = ({ fields, state }: AuthFormProps) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-10">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-md border border-amber-600 flex items-center justify-center">
            <div className="w-3 h-3 bg-amber-500 rounded-sm" />
          </div>
          <span className="text-zinc-200 text-sm tracking-widest uppercase font-poppins">cryptex</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="sm:text-3xl font-normal text-zinc-100 mb-2 font-poppins text-[20px]">Welcome back</h1>
          <p className="text-zinc-500  leading-relaxed font-roboto text-xs sm:text-sm">
            Sign in to your account to continue.
          </p>
        </div>

        <FormSection fields={fields} state={state} />


        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs tracking-widest uppercase">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Sign up link */}
        <p className="text-center text-zinc-500 text-xs sm:text-sm capitalize">
          {state == 'login' ? "Don't have an account ? " : "already have an account ? "}

          <Link href={state === 'login' ? "/auth/register" : "/auth/login"} className="text-purple-500 hover:text-purple-400 transition-colors duration-150">
            {state == 'login' ? "create one" : "sign in"}
          </Link>
        </p>

      </div>
    </div>
  )
}

export default AuthForm