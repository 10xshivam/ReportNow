import React from 'react'

interface ReportSubmittedProps {
    data:string;
}

export default function ReportSubmitted({data}:ReportSubmittedProps) {
  return (
    <div>ReportSubmitted {data}</div>
  )
}
