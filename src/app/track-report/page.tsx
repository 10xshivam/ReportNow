import ReportTracker from "@/components/report/ReportTracker";

export default function TrackReport() {
  return (
    <div className=" flex flex-col items-center justify-center py-48 w-full min-h-screen space-y-4 ">
      <h2 className="text-6xl text-center text-white font-bold tracking-tight ">
        Track Your Report
        <span className="text-center block text-4xl mt-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
          Stay Informed
        </span>
      </h2>
      <p className="text-white/50 text-lg tracking-tight">
        Enter your report ID to check the current status and updates
      </p>
      <div className="container mx-auto flex justify-center">
        <ReportTracker/>
      </div>
    </div>
  );
}
