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

export default function ReportTracker() {
  const form = useForm<z.infer<typeof trackReportSchema>>({
    resolver: zodResolver(trackReportSchema),
    defaultValues: {
      reportId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof trackReportSchema>) => {};

  return (
    <div className="w-full max-w-lg border border-white/10 p-7 rounded-xl bg-zinc-900/60">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="reportId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Report ID" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 w-full h-11 rounded-lg"
          >
            Track Report
          </Button>
        </form>
      </Form>
    </div>
  );
}
