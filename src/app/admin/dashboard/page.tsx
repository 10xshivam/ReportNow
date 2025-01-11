"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Dashboard() {
  const {data:session} = useSession()
  return (
  
    <div className='flex justify-center items-center w-full min-h-screen flex-col'>
      <Button onClick={() => signOut()}>Logout</Button>
      <p>Name : {session?.user.name}</p>
      <Button onClick={()=> axios.get('/api/reports')}>sent</Button>
    </div>
  )
}
