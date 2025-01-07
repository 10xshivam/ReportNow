"use client";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ReportSubmittedProps {
  data: string;
}

export default function ReportSubmitted({ data }: ReportSubmittedProps) {
  const reportId = data || "ERROR-ID-NOT-FOUND";
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reportId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="p-3 bg-green-500/10 rounded-full w-fit">
        <Check className="text-green-500 h-16 w-16" />
      </div>
      <h3 className="text-xl font-medium mt-4">
        Report Successfully Submitted
      </h3>
      <p className="text-sm text-zinc-400 my-2 ">
        Your report has been securely transmitted to law enforcement
      </p>
      <div className="flex flex-col items-center mt-3 bg-zinc-800/50 p-6 space-y-3 rounded-lg max-w-md mx-auto text-center">
        <p className="text-md font-medium">Your Report ID</p>
        <div className="bg-zinc-900 p-3 rounded w-full relative">
          <code className="text-sky-500 text-lg">{reportId}</code>
          <div
            className="absolute inline bg-sky-500/5 p-1.5 rounded-lg top-[10px] right-3 hover:bg-sky-500/10"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <Check className="text-sky-500 h-5 w-5" />
            ) : (
              <Clipboard className="text-sky-500 w-5 h-5" />
            )}
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-400">
          Save this ID to check your report status or communicate securely with
          law enforcement
        </p>
      </div>
      <Button
        className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 mt-7 px-5 rounded-lg hover:to-blue-700"
        onClick={() => router.push("/")}
      >
        Return to Homepage
      </Button>
    </div>
  );
}
