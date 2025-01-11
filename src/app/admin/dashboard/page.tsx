"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { Report, ReportStatus } from '@prisma/client'
import { useToast } from '@/hooks/use-toast'

export default function Dashboard() {
  const {data:session} = useSession()
  const {toast} = useToast()
  const [loading,setLoading] = useState(false)
  const [reports,setReports] = useState<Report[]>([])
  const [error,setError] = useState("")
  
  const fetchReports = async () => {
    setError("")
    setLoading(true)
    try {
      const response =  await axios.get('/api/reports')
      setReports(response.data)
      console.log(response.data)

    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong.");
      }
      toast({
        title: "Error in fetching reports",
        description: error,
      });
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (reportId:string,newStatus:ReportStatus) => {
    try {
      const response = await axios.patch(`/api/${reportId}`,{status:newStatus})
      if(response.data){
        fetchReports()
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong.");
      }
      toast({
        title: "Error in updating report",
        description: error,
      });
    }
  }

  return (
  
    <div className='flex  items-center w-full min-h-screen flex-col p-36'>
      <h2>Dashboard</h2>
    </div>
  )
}
