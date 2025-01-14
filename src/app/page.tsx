import { Button } from "@/components/ui/button";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Link from "next/link";
import Safari from "@/components/ui/safari";

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        viewBox="0 0 24 24"
      >
        <path
          fill="#00d5ff"
          d="M17.06 13c-1.86 0-3.42 1.33-3.82 3.1c-.95-.41-1.82-.3-2.48-.01C10.35 14.31 8.79 13 6.94 13C4.77 13 3 14.79 3 17s1.77 4 3.94 4c2.06 0 3.74-1.62 3.9-3.68c.34-.24 1.23-.69 2.32.02c.18 2.05 1.84 3.66 3.9 3.66c2.17 0 3.94-1.79 3.94-4s-1.77-4-3.94-4M6.94 19.86c-1.56 0-2.81-1.28-2.81-2.86s1.26-2.86 2.81-2.86c1.56 0 2.81 1.28 2.81 2.86s-1.25 2.86-2.81 2.86m10.12 0c-1.56 0-2.81-1.28-2.81-2.86s1.25-2.86 2.81-2.86s2.82 1.28 2.82 2.86s-1.27 2.86-2.82 2.86M22 10.5H2V12h20zm-6.47-7.87c-.22-.49-.78-.75-1.31-.58L12 2.79l-2.23-.74l-.05-.01c-.53-.15-1.09.13-1.29.64L6 9h12l-2.44-6.32z"
        ></path>
      </svg>
    ),
    title: "Anonymous Reporting",
    description:
      "Report incidents without revealing your identity. Your privacy is safeguarded through our advanced anonymous reporting system.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="#00d5ff"
          d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m7 0a4 4 0 1 1-3.995 4.2L13 17l.005-.2A4 4 0 0 1 17 13"
        ></path>
      </svg>
    ),
    title: "Incident Categorization",
    description:
      "Quickly classify reports as emergency or non-emergency with specific incident types like Theft, Fire, or Medical Emergency.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="#00d5ff"
          d="M3 23q-.825 0-1.412-.587T1 21v-2q0-.425.288-.712T2 18t.713.288T3 19v2h2q.425 0 .713.288T6 22t-.288.713T5 23zm18 0h-2q-.425 0-.712-.288T18 22t.288-.712T19 21h2v-2q0-.425.288-.712T22 18t.713.288T23 19v2q0 .825-.587 1.413T21 23m-9-4.5q-2.65 0-4.9-1.4t-3.525-3.825q-.15-.3-.225-.612t-.075-.638q0-.35.075-.675t.225-.625Q4.85 8.3 7.1 6.9T12 5.5t4.9 1.4t3.525 3.825q.15.3.225.613t.075.662t-.075.663t-.225.612Q19.15 15.7 16.9 17.1T12 18.5m0-2q2.2 0 4.025-1.2t2.8-3.3q-.975-2.1-2.8-3.3T12 7.5T7.975 8.7t-2.8 3.3q.975 2.1 2.8 3.3T12 16.5m0-1q1.45 0 2.475-1.025T15.5 12t-1.025-2.475T12 8.5T9.525 9.525T8.5 12t1.025 2.475T12 15.5m0-2q-.625 0-1.063-.437T10.5 12t.438-1.062T12 10.5t1.063.438T13.5 12t-.437 1.063T12 13.5M23 3v2q0 .425-.288.713T22 6t-.712-.288T21 5V3h-2q-.425 0-.712-.288T18 2t.288-.712T19 1h2q.825 0 1.413.588T23 3M3 1h2q.425 0 .713.288T6 2t-.288.713T5 3H3v2q0 .425-.288.713T2 6t-.712-.288T1 5V3q0-.825.588-1.412T3 1"
        ></path>
      </svg>
    ),
    title: "Report Tracking",
    description:
      "Receive a unique report ID and track the status of your report in real-time for complete transparency.",
  },
];

const data = [
  { value: "1K+", label: "Reports Filed" },
  { value: "100%", label: "Anonymity Rate" },
  { value: "24/7", label: "Support Available" },
];

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-52 overflow-x-hidden px-16 max-md:pt-20 max-md:px-7">
      <div className="relative w-full items-center py-10 max-md:pt-14">
        <div className=" flex flex-col justify-center items-start">
          <div className="px-3 py-1.5 rounded-full ring-1 ring-sky-500/50 bg-sky-500/10 text-sky-500 flex justify-center items-center hover:bg-sky-500/20 transition-all gap-1 mb-3 text-sm ml-48 max-md:hidden">
            <LockKeyhole className="text-sky-600 w-4" />
            Your voice, your safety.
          </div>
          <h2 className="text-8xl font-bold tracking-tight max-md:text-[2.9rem]">
            Report Safely,
            <span className="block mt-5 mb-5 max-md:mt-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              act SWIFTLY.
            </span>
          </h2>
          <p className="text-white/40 max-w-[700px] max-md:text-[0.7rem]">
            Quick Report allows you to securely and anonymously report
            incidents, whether emergencies like medical crises or
            non-emergencies like theft or violence.
          </p>
          <div className="flex gap-5 mt-7 max-md:mt-5 max-md:gap-3">
            <Link href={"/submit-report"}>
              <Button className="group bg-blue-600 py-6 px-7 rounded-lg max-md:p-3 max-md:text-[0.7rem]">
                Make anonymous report{" "}
                <ArrowUpRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={"/how-it-works"}>
              <Button className="p-6 bg-white/5 ring-2 ring-white/30 rounded-lg max-md:p-3 max-md:text-[0.7rem]">
                How it works
              </Button>
            </Link>
          </div>
        </div>
        <Safari
          url="quickreport.com/submit-report"
          className="w-[900px] h-[570px] absolute -top-5 -right-60 transform -rotate-6 p-2 border bg-white/10 border-white/10 rounded-xl shadow-white z-40 max-md:hidden"
          imageSrc="https://res.cloudinary.com/dbbvilfd4/image/upload/v1736685697/Screenshot_2025-01-12_180157_sglqw5.png"
        />
      </div>
      <div className="w-full pt-64 pb-20 flex flex-col justify-center items-center space-y-10 max-md:space-y-7 max-md:py-5">
        <h2 className="text-7xl max-md:text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
          Features
        </h2>
        <div className="flex gap-8 max-md:flex-col max-md:gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-zinc-900 flex flex-col rounded-xl gap-3 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base"
            >
              <div className="p-3 rounded-lg bg-sky-500/10 w-fit max-md:p-2">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p className="text-sm max-w-80 text-zinc-500 max-md:text-[0.8rem]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full pt-20 pb-32 flex flex-col justify-center items-center space-y-10 max-md:py-5 max-md:space-y-6 max-md:pb-14">
        <h2 className="text-4xl font-bold tracking-tight max-md:text-2xl max-md:text-center">
          Trusted by Thousands,{" "}
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Powered by Commitment
          </span>
        </h2>
        <div className="flex gap-36 bg-zinc-900 rounded-xl px-20 py-5 max-md:gap-4 max-md:p-3">
          {data.map((item) => (
            <div
              key={item.value}
              className="p-6 flex flex-col text-lg justify-center items-center gap-1 max-md:gap-0 max-md:p-3"
            >
              <h3 className="text-3xl font-bold max-md:text-lg">{item.value}</h3>
              <p className="text-sm max-w-80 text-zinc-400 max-md:text-[0.7rem] max-md:text-center max-md:leading-4">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
