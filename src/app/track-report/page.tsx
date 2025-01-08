import ReportTracker from "@/components/report/ReportTracker";

export default function TrackReport() {
  return (
    <div className=" flex flex-col items-center justify-center py-32 w-full min-h-screen">
      <div className="container mx-auto flex justify-center">
        <ReportTracker/>
      </div>
    </div>
  );
}
