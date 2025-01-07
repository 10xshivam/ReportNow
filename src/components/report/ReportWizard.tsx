"use client";
import { useState } from "react";
import ReportForm from "./ReportForm";
import ReportSubmitted from "./ReportSubmitted";

export default function ReportWizard() {
  const [reportData, setReportData] = useState<string | null>(null);

  const handleStepComplete = (data: string) => {
    setReportData(data);
  };
  return (
    <div className="rounded-2xl bg-zinc-900 p-8">
      {!reportData ? (
        <ReportForm onComplete={handleStepComplete} />
      ) : (
        <ReportSubmitted data={reportData} />
      )}
    </div>
  );
}
