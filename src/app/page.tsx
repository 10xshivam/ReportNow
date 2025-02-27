import { ArrowUpRight, Shield } from "lucide-react";
import Link from "next/link";
import { BsIncognito } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { MdSpatialTracking } from "react-icons/md";
import { FaComments, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const features = [
  {
    icon: BsIncognito,
    title: "Anonymous Reporting",
    description:
      "Report incidents without revealing your identity. Your privacy is safeguarded through our advanced anonymous reporting system.",
  },
  {
    icon: BiSolidCategory,
    title: "Incident Categorization",
    description:
      "Quickly classify reports as emergency or non-emergency with specific incident types like Theft, Fire, or Medical Emergency.",
  },
  {
    icon: MdSpatialTracking,
    title: "Report Tracking",
    description:
      "Receive a unique report ID and track the status of your report in real-time for complete transparency.",
  },
  {
    icon: FaComments,
    title: "Anonymous Chat for Follow-Ups",
    description:
      "Engage in secure, anonymous conversations using your report ID to follow up on your case without revealing personal details.",
  },
  {
    icon: MdEmail,
    title: "Basic Notifications",
    description:
      "Opt-in to receive email notifications for updates regarding your report status and responses from authorities.",
  },
  {
    icon: FaGlobe,
    title: "Multi-Language Support",
    description:
      "Use the platform in multiple languages to ensure accessibility and ease of communication for all users.",
  },
];

const faqs = [
  {
    value: "item-1",
    question: "Is my identity protected when I submit a report?",
    answer:
      "Yes! Our platform ensures complete anonymity. You can report incidents without revealing any personal information.",
  },
  {
    value: "item-2",
    question: "What types of incidents can I report?",
    answer:
      "You can report various incidents, including theft, assault, vandalism, harassment, fire, and medical emergencies.",
  },
  {
    value: "item-3",
    question: "How do I track my report status?",
    answer:
      "After submitting a report, you will receive a unique Report ID. Use this ID to track updates and responses in real-time.",
  },
  {
    value: "item-4",
    question: "Can I communicate anonymously with authorities after reporting?",
    answer:
      "Yes! Our Anonymous Chat feature allows you to follow up on your report while keeping your identity hidden.",
  },
  {
    value: "item-5",
    question: "Will I receive notifications about my report?",
    answer:
      "If you opt-in, you will receive email notifications with updates about your report’s progress.",
  },
  {
    value: "item-6",
    question: "Is the platform available in multiple languages?",
    answer:
      "Yes! Our app supports multiple languages, ensuring accessibility for diverse users.",
  },
];

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-52 overflow-x-hidden px-16 max-md:pt-20 max-md:px-7">
      <div className=" flex flex-col gap-28 items-center justify-center w-full max-md:pt-14">
        <div className=" flex flex-col justify-center items-center">
          <div className="px-3 py-1.5 rounded-full ring-1 ring-red-500/50 bg-red-500/10  flex justify-center items-center hover:bg-red-500/20 transition-all gap-1 mb-7 text-sm max-md:hidden">
            <Shield className="text-red-600" size={18} />
            24/7 Emergency Response System
          </div>
          <h2 className="text-8xl font-bold tracking-tighter max-md:text-[2.9rem] text-center ">
            Instant & Anonymous
            <span className="block mt-5 mb-5 max-md:mt-2 bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent pb-2">
              Incident Reporting
            </span>
          </h2>
          <p className="text-gray-500 max-w-[700px] max-md:text-[0.7rem] text-center mt-2">
            Report emergencies instantly & securely. With ReportNow, your safety
            is our priority-ensuring immediate response coordination and
            complete anonymity when needed.
          </p>
          <div className="flex gap-5 mt-7 max-md:mt-5 max-md:gap-3">
            <Link href={"/submit-report"}>
              <button className="group bg-gray-600 hover:bg-gray-700 tracking-tight py-3 px-5 rounded-lg text-base max-md:p-3 max-md:text-[0.7rem]">
                Make anonymous report
                <ArrowUpRight
                  className="group-hover:translate-x-1 transition-transform inline ml-2"
                  size={20}
                />
              </button>
            </Link>
            <Link href={"/how-it-works"}>
              <button className="py-3 px-5 hover:bg-white/5 ring-2 ring-gray-600 rounded-lg text-base max-md:p-3 max-md:text-[0.7rem]">
                How it works ?
              </button>
            </Link>
          </div>
        </div>
        <div className="border bg-gray-500/10 border-white/10 p-2  rounded-xl shadow max-md:hidden">
          <Image src={'/image.png'} width={1000} height={800} alt="submit-page"className="rounded-lg border border-gray-100/10" />
        </div>
      </div>
      <div className="w-full pt-32 pb-20 flex flex-col justify-center items-center space-y-14 max-md:space-y-7 max-md:py-5">
        <h2 className="text-8xl max-md:text-4xl font-bold tracking-tight bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent">
          Core Features
        </h2>
        <div className="flex gap-7 max-md:flex-col max-md:gap-5 flex-wrap justify-center">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-gray-500/20 border border-gray-100/10 flex flex-col rounded-xl gap-2 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base"
            >
              <div className="p-3 rounded-lg bg-red-400/10 w-fit max-md:p-2">
                <feature.icon className="text-red-500" size={20} />
              </div>
              <h3>{feature.title}</h3>
              <p className="text-sm max-w-80 text-gray-500 max-md:text-[0.8rem] leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full pt-20 pb-24 flex flex-col justify-center items-center gap-10 max-md:space-y-7 max-md:py-5">
        <h2 className="text-8xl max-md:text-4xl font-bold tracking-tight bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent pb-1">
          FAQs
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-[700px] max-md:w-full"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={faq.value}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="mb-24 flex justify-center items-center flex-col gap-2">
        <h3 className="text-3xl font-bold tracking-wider bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent">
          READY TO REPORT{" "}
        </h3>
        <p className="text-gray-500 text-lg tracking-tight mb-3">
          Take action now and report an incident securely and anonymously.
        </p>
        <button className="px-8 py-2 bg-gray-600 text-lg rounded-lg hover:bg-gray-800 transition-all">
          Report Now
        </button>
      </div>
    </div>
  );
}
