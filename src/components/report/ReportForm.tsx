import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { reportSchema } from "@/schemas/reportSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Info,
  ArrowRight,
  MapPin,
  TriangleAlert,
  X,
  LoaderCircle,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Image as ImgIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import axios from "axios";
import crypto from "crypto";
import { useToast } from "@/hooks/use-toast";

interface ReportFormProps {
  onComplete: (data: string) => void;
}

const INCIDENT_TYPES = [
  "Theft",
  "Fire Outbreak",
  "Medical Emergency",
  "Natural Disaster",
  "Violence",
  "Other",
];

export default function ReportForm({ onComplete }: ReportFormProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reportId: "",
      incidentType: "",
      location: "",
      title: "",
      description: "",
      status: "PENDING",
    },
  });

  const { handleSubmit, control, setValue, watch } = form;
  const reportType = watch("reportType");

  // Image analyzing
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    setIsAnalyzing(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await axios.post("/api/analyze-image", { image: base64 });
      const data = response.data;
      setValue("title", data.title || "");
      setValue("description", data.description || "");
      setValue("incidentType", data.incidentType || "");

      setImage(base64);
    } catch (error) {
      console.error("Error in analyzing image", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Getting location
  const getLocation = async () => {
    setError("");
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          const response = await axios.post("/api/get-current-location", {
            latitude,
            longitude,
          });
          setValue("location", response.data.address);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            default:
              setError("An unknown error occurred.");
              break;
          }
        }
      );
    }
  };

  // Creating ReportID
  const generateReportID = useCallback(() => {
    const timestamp = Date.now().toString();
    const randomBytes = crypto.randomBytes(16).toString("hex");
    const combinedString = `${timestamp}-${randomBytes}`;
    return crypto
      .createHash("sha256")
      .update(combinedString)
      .digest("hex")
      .slice(0, 16);
  }, []);

  setValue("reportId", generateReportID())

  const onSubmit = async (data: z.infer<typeof reportSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/reports/create", {
        ...data,
        image,
      });
      onComplete(response?.data.reportId);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong.");
      }
      toast({
        title: "Error in submitting report",
        description: error,
      });
    } finally {
      console.log("Resetting isSubmitting state");
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          <button
            type="button"
            onClick={() => setValue("reportType", "EMERGENCY")}
            className={`border-2 px-16 py-6 rounded-2xl ${
              reportType === "EMERGENCY"
                ? "bg-red-500/10 border-red-500 shadow-lg shadow-red-500/20"
                : "border-white/10 hover:bg-red-500/10 hover:border-red-500"
            }`}
          >
            <div className="flex flex-col justify-center items-center space-y-2">
              <TriangleAlert className="text-red-500 w-8 h-8" />
              <span className="text-red-500 font-medium">Emergency</span>
              <span className="text-zinc-400 text-xs">
                Immediate Response Required
              </span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setValue("reportType", "NON_EMERGENCY")}
            className={`border-2 px-16 py-6 rounded-2xl hover: ${
              reportType === "NON_EMERGENCY"
                ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/20"
                : "border-white/10"
            } hover:bg-orange-500/10 hover:border-orange-500`}
          >
            <div className="flex flex-col justify-center items-center space-y-2">
              <Info className="text-orange-500 w-8 h-8" />
              <span className="text-orange-500 font-medium">Non-Emergency</span>
              <span className="text-zinc-400 text-xs">General Report</span>
            </div>
          </button>
        </div>
        <div className="relative">
          <input
            type="file"
            accept="/image*"
            onChange={handleImageUpload}
            id="image-upload"
            className="hidden"
            ref={fileInputRef}
          />
          <label
            htmlFor="image-upload"
            className={`border-2 px-8 py-8 w-full block rounded-lg border-dashed border-white/10 hover:border-sky-400/50 hover:bg-sky-400/10 
            ${image && "border-sky-400/50 bg-sky-400/10"}`}
          >
            {!image ? (
              <div className="flex flex-col justify-center items-center space-y-4">
                <ImgIcon className="w-11 h-11 text-zinc-500" />
                <span className="text-sm text-zinc-400">
                  Drop an image here or click to upload
                </span>
              </div>
            ) : (
              <div className="flex justify-center items-center ">
                <div
                  className="absolute top-4 right-4 bg-zinc-600 p-1 rounded-full hover:bg-zinc-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  <X className="text-sky-500 w-5 h-5" />
                </div>
                <Image
                  src={image}
                  alt="Uploaded image"
                  width={500}
                  height={500}
                  className="rounded-xl"
                />
              </div>
            )}
          </label>
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/70 rounded-lg flex justify-center items-center">
              <div className="flex justify-center items-center gap-2">
                <LoaderCircle className="text-sky-500 animate-spin h-5 w-5" />
                <span className="text-sky-500 font-medium">
                  Analyzing image...
                </span>
              </div>
            </div>
          )}
        </div>
        <FormField
          control={control}
          name="incidentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incident Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border-zinc-800">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCIDENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="Enter a location or use pin" {...field} />
                  <div
                    className="absolute inline bg-sky-500/5 p-1.5 rounded-lg top-[7px] right-2 hover:bg-sky-500/10"
                    onClick={getLocation}
                  >
                    {loading ? (
                      <LoaderCircle className="text-sky-500 animate-spin h-5 w-5" />
                    ) : (
                      <MapPin className="text-sky-500 w-5 h-5" />
                    )}
                  </div>
                  {error && (
                    <span className="text-sm text-red-500 mt-2 ml-1">
                      {error}
                    </span>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="h-[150px]" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="group bg-blue-500 hover:bg-blue-600 w-full h-11 rounded-lg"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="text-white animate-spin h-5 w-5" />
              Submitting...
            </>
          ) : (
            <>
              Submit Report{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
