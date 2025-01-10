"use client"
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Dashboard() {
  const {data:session} = useSession()
  return (
  
    <div className='flex justify-center items-center w-full min-h-screen'>
      <Button onClick={() => signOut()}>Logout</Button>
      <p>Name : {session?.user.name}</p>
    </div>

  )
}
