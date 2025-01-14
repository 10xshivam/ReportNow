"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Calendar, Info, MapPin } from "lucide-react";
import DashboardSkeleton from "@/components/skeletons/dashboardSkeleton";

const fetchReports = async () => {
  try {
    const response = await axios.get("/api/reports");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default function Dashboard() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState("");
  const [statusType, setStatusType] = useState("ALL");
  const [reportType, setReportType] = useState("ALL");

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const result = await fetchReports();
        setReports(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleRefresh = async () => {
    const result = await fetchReports();
    setReports(result);
  };

  const updateStatus = async (reportId: string, status: ReportStatus) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/reports/update?reportId=${reportId}`, {
        status,
      });
      if (response.data) {
        handleRefresh();
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
    } finally {
      setLoading(false);
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

  const filteredReports = reports.filter((currentReport) => {
    const isStatusMatching =
      statusType === "ALL" || currentReport.status === statusType;
    const isTypeMatching =
      reportType === "ALL" || currentReport.reportType === reportType;
    return isStatusMatching && isTypeMatching;
  });

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex items-center w-full min-h-screen flex-col py-24">
      <div className="flex w-full justify-between px-20">
        <div className="flex gap-x-5">
          <Select
            onValueChange={(value) =>
              setStatusType(value as ReportStatus | "ALL")
            }
            value={statusType}
          >
            <SelectTrigger className="w-60 border-white/20 border-2">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {Object.values(ReportStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setReportType(value as ReportType | "ALL")
            }
            value={reportType}
          >
            <SelectTrigger className="w-60 border-white/20 border-2">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              {Object.values(ReportType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button>{filteredReports.length}  Reports</Button>
        </div>
      </div>
      <div className="flex w-full px-20 py-10 gap-8 flex-wrap">
        {filteredReports.map((report) => (
          <div
            key={report.reportId}
            className="w-full border-2 border-white/10 p-6 rounded-xl space-y-5 bg-white/5"
          >
            <div className="flex justify-between items-center">
              <div className="flex  items-center gap-4">
                <span className="text-lg font-medium">{report.title}</span>
                <span
                  className={`bg-white/10 rounded-full px-3 py-1 ${getStatusColor(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>
              <Select
                onValueChange={(value) =>
                  updateStatus(report.reportId, value as ReportStatus)
                }
                value={report.status}
              >
                <SelectTrigger className="w-60 border-white/20 border-2">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ReportStatus).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm">{report.description}</p>
            <div className="flex gap-5 text-white/30 tracking-tight text-base">
              <span className="flex items-center gap-1">
                <Info className={`${report.reportType === "EMERGENCY" ? "text-red-500":"text-orange-500"} w-5`}/>
                {report.reportType}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="text-green-500 w-5"/>
                {report.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="text-sky-500 w-5"/>
                {new Date(report.createdAt).toLocaleDateString(undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
              </span>
            </div>
            <Image src={report.image!} alt='incident-image' width={400} height={400} className="rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
