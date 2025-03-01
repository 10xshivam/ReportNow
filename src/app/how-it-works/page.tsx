import { Button } from "@/components/ui/button";
import { ArrowUpRight, AudioWaveform, LockKeyhole, MessageSquareText, ShieldCheck, SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

const steps = [
    {
      step: "Step 01",
      title: "Submit Your Report",
      description:
        "Fill out our secure form with as much detail as possible. You can include photos, videos, or documents to support your report. No personal information is required to maintain anonymity.",
      icon: <SquarePen className="text-gray-400"/>,
    },
    {
      step: "Step 02",
      title: "Encryption & Anonymization",
      description:
        "Your report is encrypted with government-compliant security protocols, ensuring that all metadata, including IP address and device details, is anonymized for your safety.",
      icon: <LockKeyhole className="text-gray-400"/>,
    },
    {
      step: "Step 03",
      title: "Jurisdiction Verification & Routing",
      description:
        "Our system verifies the jurisdiction of the issue and forwards the report to the relevant Indian law enforcement agency, such as local police, cybercrime units, or specialized task forces.",
      icon: <ShieldCheck className="text-gray-400"/>,
    },
    {
      step: "Step 04",
      title: "Secure Follow-Up Communication",
      description:
        "If necessary, law enforcement agencies can communicate with you via an encrypted platform using your anonymous report ID. You control how and when to respond.",
      icon: <MessageSquareText className="text-gray-400"/>,
    },
    {
      step: "Step 05",
      title: "Track Your Report's Progress",
      description:
        "Easily track the status of your report through our app. Receive updates and notifications while maintaining complete privacy.",
      icon: <AudioWaveform className="text-gray-400"/>,
    },
  ];

export default function HowItWorks() {
  return (
    <div className="w-full min-h-screen pt-48 justify-center items-center max-md:pt-28">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-6xl font-bold tracking-tight text-transparent max-md:text-4xl max-md:text-center">
          How Quick Report Works?
          <span className="block text-3xl mt-4 bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent text-center max-md:text-xl max-md:mt-1">
            Your Safety is Our Priority
          </span>
        </h1>
      </div>
      <div className="w-full flex flex-col items-center justify-center p-20 gap-10 max-md:pt-10 max-md:px-7 max-md:gap-6">
        {steps.map((step,i)  => (
            <div
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-gray-800/50 p-8 transition-all hover:bg-gray-800/80 max-md:p-5"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-400/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex gap-6 max-md:flex-col max-md:gap-2">
              <div >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10">
                  {step.icon}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-400">
                  {step.step}
                </div>
                <h3 className="mt-2 text-xl font-medium text-white max-md:text-[1.1rem]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-400  max-w-3xl max-md:leading-5 max-md:text-[0.8rem]">
                  {step.description}
                </p>
              </div>
            </div>
            
          </div>
        ))}
      </div>
      <div className="mb-20 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Ready to Make a Report?
            </h2>
            <Link href={"/submit-report"}>
              <Button className="group bg-gray-600 hover:bg-gray-700 p-6 px-7 rounded-lg">
                Start anonymous report{" "}
                <ArrowUpRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
    </div>
  );
}
