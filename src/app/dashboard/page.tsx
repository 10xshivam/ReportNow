"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

export default function dashboard() {
  return (
    <div className='flex justify-center items-center w-full min-h-screen' onClick={() => signOut()}>logout</div>
  )
}
