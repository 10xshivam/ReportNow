"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trackReportSchema } from "@/schemas/reportSchema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Image from "next/image";

interface ReportDetails {
  image: string;
  reportId: string;
  status: string;
  createdAt: string;
  title: string;
  description: string;
  location: string;
}

export default function ReportTracker() {
  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof trackReportSchema>>({
    resolver: zodResolver(trackReportSchema),
    defaultValues: {
      reportId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof trackReportSchema>) => {
    setIsSubmitting(true);
    setError("");
    try {
      const details = await axios.get(`/api/reports/details?reportId=${data.reportId}`);
      console.log(details.data);
      setReportDetails(details.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong.");
      }
      toast({
        title: "Invalid Report ID",
        description: error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  function getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-400";
      case "in_progress":
        return "text-sky-400";
      case "resolved":
        return "text-emerald-400";
      case "dismissed":
        return "text-red-400";
      default:
        return "text-white";
    }
  }

  return (
    <div>
      {!reportDetails ? (
        <div className="space-y-4">
          <h2 className="text-6xl text-center text-white font-bold tracking-tight  max-md:text-5xl">
            Track Your Report
            <span className="text-center block text-4xl mt-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent  max-md:text-3xl max-md:mb-6">
              Stay Informed
            </span>
          </h2>
          <p className="text-white/50 text-lg tracking-tight  max-md:hidden">
            Enter your report ID to check the current status and updates
          </p>
          <div className="w-full max-w-lg border border-white/10 p-7 rounded-xl bg-zinc-900/60  max-md:p-4   ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8  max-md:space-y-4 "
              >
                <FormField
                  control={form.control}
                  name="reportId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Report ID" {...field} />
                      </FormControl>
                      {form.formState.errors.reportId && (
                        <span className="text-sm text-red-500 mt-2">
                          {form.formState.errors.reportId.message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 w-full h-11 rounded-lg"
                >
                  {isSubmitting ? "Searching..." : "Track Report"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div>
          {/* <h3 className="text-center text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent mb-12">
            Report Details
          </h3> */}
          <div className="w-full border border-white/10 p-6 rounded-xl bg-black/30 backdrop-blur-xl shadow-sm flex gap-7 max-md:flex-col ">
            <div className="flex flex-col max-w-xl max-md:max-w-[300px] space-y-3">
              <Image
                src={reportDetails.image}
                alt="incident-image"
                width={600}
                height={600}
                className="rounded-xl"
              />
              <div className="w-full p-3 bg-white/5 rounded-xl flex flex-col justify-between space-y-1.5">
                <span className="text-zinc-500 text-sm">Title</span>
                <span className="block text-md">{reportDetails.title}</span>
              </div>
              <div className="w-full p-3 bg-white/5 rounded-xl flex flex-col justify-between space-y-1.5">
                <span className="text-zinc-500 text-sm">Description</span>
                <span className="block text-md leading-relaxed">
                  {reportDetails.description}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-96 max-md:max-w-[300px]">
              <p className="font-bold text-xl">Report Details</p>
              <div className="w-full p-3 bg-white/5 rounded-xl flex justify-between">
                <span className="text-zinc-500">Report ID</span>
                <code>{reportDetails.reportId}</code>
              </div>
              <div className="w-full p-3 bg-white/5 rounded-xl flex justify-between items-center">
                <span className="text-zinc-500">Status</span>
                <span
                  className={`bg-white/10 rounded-full px-3 py-1 ${getStatusColor(
                    reportDetails.status
                  )}`}
                >
                  {reportDetails.status}
                </span>
              </div>
              <div className="w-full p-3 bg-white/5 rounded-xl flex justify-between">
                <span className="text-zinc-500">Submitted On</span>
                <span>
                  {new Date(reportDetails.createdAt).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="w-full p-3 bg-white/5 rounded-xl flex flex-col justify-between space-y-1.5">
                <span className="text-zinc-500 text-sm">Location</span>
                <span className="block text-md">{reportDetails.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
