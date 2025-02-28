"use client"
import { Button } from "@/components/ui/button";
// import Header from "@/components/Header";
import { Phone, FileText, Shield, Scale, Heart, Users, Download, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
export default function ResourcesPage(){
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  return (
    <div className="min-h-screen">
      <section className="pt-40 pb-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Safety & Support Resources</span>
            </div>
            <h1 className="text-4xl md:text-6xl tracking-tight font-bold mb-6 animate-fade-up">
              Emergency Resources & 
              <span className="block text-purple-500 mt-2">
                Support Information
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Access critical information, guidelines, and resources to help you stay safe, 
              report effectively, and find support in emergency situations.
            </p>
          </div>
        </div>
      </section>
      <div className="flex justify-center flex-col md:px-28">

      {/* Resources Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 ">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Emergency Contact Information */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer border-b border-white/10"
                onClick={() => toggleSection("emergency")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-destructive/20 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-destructive" />
                  </div>
                  <h2 className="text-xl font-semibold">Emergency Contact Information</h2>
                </div>
                {expandedSection === "emergency" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              <div className={`px-6 py-5 ${expandedSection === "emergency" ? "block" : "hidden"}`}>
                <h3 className="text-lg font-medium mb-3">All-India Emergency Numbers</h3>
                <ul className="mb-5 space-y-2">
                  <li className="flex items-center justify-between">
                    <span>National Emergency Number</span>
                    <span className="font-semibold text-destructive">112</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Police</span>
                    <span className="font-semibold text-destructive">100</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Fire</span>
                    <span className="font-semibold text-destructive">101</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Ambulance</span>
                    <span className="font-semibold text-destructive">102</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Women Helpline</span>
                    <span className="font-semibold text-destructive">1090/1091</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Child Helpline</span>
                    <span className="font-semibold text-destructive">1098</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Road Accident Emergency Service</span>
                    <span className="font-semibold text-destructive">1073</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Disaster Management</span>
                    <span className="font-semibold text-destructive">108</span>
                  </li>
                </ul>
                
                <h3 className="text-lg font-medium mb-3">Official Websites</h3>
                <ul className="mb-5 space-y-2">
                  <li>
                    <a href="https://www.ndma.gov.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      National Disaster Management Authority (NDMA)
                    </a>
                  </li>
                  <li>
                    <a href="https://mha.gov.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Ministry of Home Affairs
                    </a>
                  </li>
                  <li>
                    <a href="https://mohfw.gov.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Ministry of Health and Family Welfare
                    </a>
                  </li>
                  <li>
                    <a href="https://www.indianredcross.org/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Indian Red Cross Society
                    </a>
                  </li>
                </ul>
                
                <h3 className="text-lg font-medium mb-3">Major City Helplines</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <h4 className="font-medium mb-1">Delhi</h4>
                    <p className="text-white/80">Delhi Police: <span className="font-semibold text-destructive">112/100</span></p>
                    <p className="text-white/80">Covid Helpline: <span className="font-semibold text-destructive">1031</span></p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <h4 className="font-medium mb-1">Mumbai</h4>
                    <p className="text-white/80">Police: <span className="font-semibold text-destructive">100</span></p>
                    <p className="text-white/80">BMC Disaster: <span className="font-semibold text-destructive">1916</span></p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <h4 className="font-medium mb-1">Kolkata</h4>
                    <p className="text-white/80">Police: <span className="font-semibold text-destructive">100</span></p>
                    <p className="text-white/80">Disaster: <span className="font-semibold text-destructive">033-2214-3526</span></p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <h4 className="font-medium mb-1">Chennai</h4>
                    <p className="text-white/80">Police: <span className="font-semibold text-destructive">100</span></p>
                    <p className="text-white/80">Corporation: <span className="font-semibold text-destructive">1913</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reporting Guidelines */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer border-b border-white/10"
                onClick={() => toggleSection("reporting")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold">Reporting Guidelines</h2>
                </div>
                {expandedSection === "reporting" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              <div className={`px-6 py-5 ${expandedSection === "reporting" ? "block" : "hidden"}`}>
                <h3 className="text-lg font-medium mb-3">Step-by-Step Reporting Guide in India</h3>
                <ol className="list-decimal list-inside mb-5 space-y-2">
                  <li className="pl-1">
                    <span className="font-medium">Assess the situation</span> - Determine if immediate help is needed
                  </li>
                  <li className="pl-1">
                    <span className="font-medium">Dial the right number</span> - Use 112 for emergencies or the specific helpline number
                  </li>
                  <li className="pl-1">
                    <span className="font-medium">Provide clear location</span> - Share landmarks, pin location if possible
                  </li>
                  <li className="pl-1">
                    <span className="font-medium">Document details</span> - Take photos/videos if safe
                  </li>
                  <li className="pl-1">
                    <span className="font-medium">File an FIR</span> - Visit the nearest police station for criminal incidents
                  </li>
                  <li className="pl-1">
                    <span className="font-medium">Use government apps</span> - Consider apps like NDMA app, Citizen COP, or Himmat for reporting
                  </li>
                </ol>
                
                <h3 className="text-lg font-medium mb-3">Filing a Police Complaint (FIR)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-destructive">When to File an FIR</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Theft or robbery</li>
                      <li>Physical assault</li>
                      <li>Accident with injuries</li>
                      <li>Missing persons</li>
                      <li>Cyber crimes</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 border border-white/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Documents Needed</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>ID proof (Aadhaar/PAN/Voter ID)</li>
                      <li>Address proof</li>
                      <li>Contact information</li>
                      <li>Details of the incident</li>
                      <li>Evidence (if available)</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-3">Digital Reporting Options</h3>
                <ul className="space-y-2 mb-3">
                  <li className="flex items-start gap-2">
                    <div className="bg-accent/20 p-1 rounded mt-0.5">
                      <Shield className="w-3 h-3 text-accent" />
                    </div>
                    <span>CCTNS (Crime and Criminal Tracking Network & Systems) - Online FIR filing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-accent/20 p-1 rounded mt-0.5">
                      <Shield className="w-3 h-3 text-accent" />
                    </div>
                    <span>National Cyber Crime Reporting Portal - <a href="https://cybercrime.gov.in/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-accent/20 p-1 rounded mt-0.5">
                      <Shield className="w-3 h-3 text-accent" />
                    </div>
                    <span>State-specific police apps (Delhi Police app, Mumbai Police app, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-accent/20 p-1 rounded mt-0.5">
                      <Shield className="w-3 h-3 text-accent" />
                    </div>
                    <span>Citizen Cop app - Anonymous crime reporting</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Safety Tips */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer border-b border-white/10"
                onClick={() => toggleSection("safety")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold">Safety Tips for India</h2>
                </div>
                {expandedSection === "safety" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              <div className={`px-6 py-5 ${expandedSection === "safety" ? "block" : "hidden"}`}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Monsoon & Flood Safety</h3>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">During Heavy Rainfall</h4>
                      <p className="text-sm text-white/80">Stay indoors if possible. Avoid driving through flooded roads - just 15 cm of water can sweep away a car. Keep emergency supplies including medicines, drinking water, and dry foods.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Flood Evacuation</h4>
                      <p className="text-sm text-white/80">Move to higher ground immediately. Follow evacuation orders. Disconnect all electrical equipment. Take only essential items and important documents in waterproof bags.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Post-Flood Precautions</h4>
                      <p className="text-sm text-white/80">Beware of contaminated water. Get clean drinking water from authorized sources. Watch for downed power lines. Check for structural damage before entering buildings.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Earthquake Safety in India</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      <span>Drop to the ground, take cover under sturdy furniture, and hold on</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      <span>Stay away from glass, windows, outside doors, and walls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      <span>If outdoors, stay in open areas away from buildings, streetlights, and utility wires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      <span>If in a multi-story building, do not use elevators or rush to exits</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Personal Safety in Urban Areas</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      <span>Use registered public transport or verified cab services like Ola/Uber</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      <span>Share your live location with trusted contacts when traveling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      <span>Be aware of emergency exits in malls and public buildings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      <span>Install safety apps like Suraksha, Himmat Plus, or 112 India</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Downloadable Resources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 border-white/20">
                      <Download className="mr-2 h-4 w-4" />
                      Monsoon Safety Guide
                    </Button>
                    <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 border-white/20">
                      <Download className="mr-2 h-4 w-4" />
                      Earthquake Preparedness
                    </Button>
                    <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 border-white/20">
                      <Download className="mr-2 h-4 w-4" />
                      Travel Safety in India
                    </Button>
                    <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 border-white/20">
                      <Download className="mr-2 h-4 w-4" />
                      Heat Wave Protection Guide
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legal Rights and Awareness */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer border-b border-white/10"
                onClick={() => toggleSection("legal")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Scale className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold">Legal Rights in India</h2>
                </div>
                {expandedSection === "legal" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              <div className={`px-6 py-5 ${expandedSection === "legal" ? "block" : "hidden"}`}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Rights During Police Interaction</h3>
                  <p className="mb-4 text-white/80">
                    Understanding your legal rights during interactions with law enforcement can help ensure fair treatment.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Scale className="w-3 h-3 text-accent" />
                      </div>
                      <span>Right to know the reason for arrest or detention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Scale className="w-3 h-3 text-accent" />
                      </div>
                      <span>Right to legal representation and to meet a lawyer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Scale className="w-3 h-3 text-accent" />
                      </div>
                      <span>Right to inform a relative or friend about the arrest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Scale className="w-3 h-3 text-accent" />
                      </div>
                      <span>Right to be presented before a magistrate within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Scale className="w-3 h-3 text-accent" />
                      </div>
                      <span>Right to medical examination after arrest</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Rights of Women and Children</h3>
                  <div className="bg-white/10 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Important Protections:</h4>
                    <ul className="list-disc list-inside space-y-1 text-white/80">
                      <li>Protection under the POCSO Act for children</li>
                      <li>Protection against domestic violence under the DV Act, 2005</li>
                      <li>Protection against sexual harassment at workplace</li>
                      <li>Right to free legal aid for women and children</li>
                      <li>Special protections during police questioning (women officers, daytime only)</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Legal Resources in India</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://nalsa.gov.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        National Legal Services Authority (NALSA)
                      </a>
                    </li>
                    <li>
                      <a href="https://main.sci.gov.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Supreme Court of India
                      </a>
                    </li>
                    <li>
                      <a href="https://nyayasamparka.nic.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Nyaya Sampark (Legal Aid)
                      </a>
                    </li>
                    <li>
                      <a href="https://doj.gov.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Department of Justice
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Mental Health and Support */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer border-b border-white/10"
                onClick={() => toggleSection("mental")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Heart className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold">Mental Health Support</h2>
                </div>
                {expandedSection === "mental" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              <div className={`px-6 py-5 ${expandedSection === "mental" ? "block" : "hidden"}`}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Crisis Helplines in India</h3>
                  <ul className="space-y-3">
                    <li className="bg-white/10 p-3 rounded-lg flex flex-col">
                      <span className="font-semibold">NIMHANS Toll-Free Mental Health Helpline</span>
                      <span className="text-destructive font-semibold">080-46110007</span>
                      <span className="text-white/70 text-sm">24/7 professional mental health support</span>
                    </li>
                    <li className="bg-white/10 p-3 rounded-lg flex flex-col">
                      <span className="font-semibold">Vandrevala Foundation</span>
                      <span className="text-destructive font-semibold">+91 9999 666 555</span>
                      <span className="text-white/70 text-sm">24/7 mental health support and crisis intervention</span>
                    </li>
                    <li className="bg-white/10 p-3 rounded-lg flex flex-col">
                      <span className="font-semibold">Aasra</span>
                      <span className="text-destructive font-semibold">+91 9820 466 726</span>
                      <span className="text-white/70 text-sm">24/7 support for people in emotional distress</span>
                    </li>
                    <li className="bg-white/10 p-3 rounded-lg flex flex-col">
                      <span className="font-semibold">iCall</span>
                      <span className="text-destructive font-semibold">+91 9152 987 821</span>
                      <span className="text-white/70 text-sm">Mon-Sat, 10am-8pm, email: icall@tiss.edu</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Mental Health Organizations in India</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="https://nimhans.ac.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        National Institute of Mental Health and Neurosciences (NIMHANS)
                      </a>
                    </li>
                    <li>
                      <a href="https://www.thelivelovelaughfoundation.org/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        The Live Love Laugh Foundation
                      </a>
                    </li>
                    <li>
                      <a href="https://www.mannmela.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Mann Mela
                      </a>
                    </li>
                    <li>
                      <a href="https://www.sangath.in/" className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Sangath
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Cultural Context for Mental Health</h3>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Understanding Stigma in India</h4>
                      <p className="text-sm text-white/80">Mental health stigma can be strong in India. Remember that seeking help is a sign of strength, not weakness. Many organizations now offer confidential support services.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Holistic Approaches</h4>
                      <p className="text-sm text-white/80">In addition to professional help, traditional practices like yoga, meditation, and Ayurveda can complement mental healthcare. Many Indians find these approaches helpful alongside modern therapy.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Community Support</h4>
                      <p className="text-sm text-white/80">Family and community support is central to Indian culture. Involving trusted family members in your mental health journey can be beneficial when appropriate.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Community Resources */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer border-b border-white/10"
                onClick={() => toggleSection("community")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold">Community Resources</h2>
                </div>
                {expandedSection === "community" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              <div className={`px-6 py-5 ${expandedSection === "community" ? "block" : "hidden"}`}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">National Organizations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Indian Red Cross Society</h4>
                      <p className="text-sm text-white/80 mb-2">Disaster relief, emergency assistance, and humanitarian services.</p>
                      <a href="https://www.indianredcross.org/" className="text-accent text-sm hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" /> Visit Website
                      </a>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Goonj</h4>
                      <p className="text-sm text-white/80 mb-2">Disaster relief and community development.</p>
                      <a href="https://goonj.org/" className="text-accent text-sm hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" /> Visit Website
                      </a>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Akshaya Patra</h4>
                      <p className="text-sm text-white/80 mb-2">Food relief and child nutrition programs.</p>
                      <a href="https://www.akshayapatra.org/" className="text-accent text-sm hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" /> Visit Website
                      </a>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Pratham</h4>
                      <p className="text-sm text-white/80 mb-2">Education programs for underprivileged children.</p>
                      <a href="https://www.pratham.org/" className="text-accent text-sm hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" /> Visit Website
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Government Schemes</h3>
                  <p className="mb-4 text-white/80">
                    Government programs that provide support during emergencies:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Users className="w-3 h-3 text-accent" />
                      </div>
                      <span>PM Relief Fund for disaster relief assistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Users className="w-3 h-3 text-accent" />
                      </div>
                      <span>Ayushman Bharat for healthcare assistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Users className="w-3 h-3 text-accent" />
                      </div>
                      <span>Pradhan Mantri Garib Kalyan Yojana for food security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-accent/20 p-1 rounded mt-0.5">
                        <Users className="w-3 h-3 text-accent" />
                      </div>
                      <span>State Disaster Response Fund for regional disaster relief</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Volunteer Opportunities in India</h3>
                  <p className="mb-4 text-white/80">
                    Make a difference in your community by volunteering with these organizations:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href="https://www.nss.gov.in/" className="bg-white/10 p-4 rounded-lg hover:bg-white/15 transition-colors group" target="_blank" rel="noopener noreferrer">
                      <h4 className="font-semibold mb-1 flex items-center gap-1">
                        National Service Scheme (NSS) 
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-white/80">Youth volunteer organization with disaster management training</p>
                    </a>
                    <a href="https://www.ndma.gov.in/Civil-Defense-and-Community-Volunteers/Civil-Defence/Making-of-Volunteer/Aapda-Mitra" className="bg-white/10 p-4 rounded-lg hover:bg-white/15 transition-colors group" target="_blank" rel="noopener noreferrer">
                      <h4 className="font-semibold mb-1 flex items-center gap-1">
                        Aapda Mitra 
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-white/80">NDMA&apos;s disaster response volunteer program</p>
                    </a>
                    <a href="https://indiancivildefence.gov.in/volunteer.htm" className="bg-white/10 p-4 rounded-lg hover:bg-white/15 transition-colors group" target="_blank" rel="noopener noreferrer">
                      <h4 className="font-semibold mb-1 flex items-center gap-1">
                        Civil Defence Volunteers 
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-white/80">Help with emergency response and disaster management</p>
                    </a>
                    <a href="https://helpageindia.org/" className="bg-white/10 p-4 rounded-lg hover:bg-white/15 transition-colors group" target="_blank" rel="noopener noreferrer">
                      <h4 className="font-semibold mb-1 flex items-center gap-1">
                        HelpAge India 
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-white/80">Support elderly during emergencies and disasters</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};