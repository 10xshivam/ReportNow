import ReportWizard from "@/components/report/ReportWizard";

export default function SubmitReport() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-52 max-md:pt-28 max-md:px-4 max-md:pb-16">
      <div className="flex flex-col items-center justify-center">
      <h3 className=" text-7xl text-center font-bold text-white tracking-tight max-md:text-5xl">
        <span className="block text-3xl font-bold tracking-widest bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent">SUBMIT</span>
        Anonymous Report
        </h3>
        <p className="text-white/50 mt-5 text-lg tracking-tight text-center max-md:text-[0.9rem] max-md:max-w-80 max-md:leading-5">
          Your safety is our priority. All submissions are encrypted and anonymized.
        </p>
      </div>
      <div className="mt-16 rounded-2xl bg-gray-900/50 p-6 border border-white/5 max-md:mt-10 max-md:p-4">
        <ReportWizard/>
      </div>
    </div>
  )
}
