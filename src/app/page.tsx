import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-72">
      <div className="flex gap-20">
        <div>
          <h2 className=" text-7xl font-bold tracking-tight ">
            Report Safely.
            <span className="block my-3 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Empower Communities.
            </span>
          </h2>
          <p className="text-white/50 max-w-[49rem] ml-1 mt-5 tracking-wide">
            Safe Report empowers you to report incidents effortlessly and
            anonymously, ensuring your identity remains protected at all times.
            With advanced encryption and user-friendly features, we make
            reporting easy and secure for everyone. Together, lets take a step
            toward building safer and more vigilant communities.
          </p>
          <Link href={"/submit-report"}>
            <Button className="group bg-gradient-to-r from-sky-500 to-blue-600 p-6 mt-7 px-7 mr-6 rounded-xl">
              Make anonymous report{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href={"/how-it-works"}>
            <Button className="p-6 bg-white/5 ring-2 ring-white/30 rounded-xl">
              How it works
            </Button>
          </Link>
        </div>
        <div>
          <Image src={"/Iphone.png"} alt="iphone" height={500} width={500} />
        </div>
      </div>
    </div>
  );
}
