"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, Loader } from "lucide-react";
import { toast } from "sonner";

const steps = [
   { id: "step1", title: "Basic Info" },
   { id: "step2", title: "Contact Details" },
   { id: "step3", title: "Services" },
   { id: "step4", title: "Confirmation" },
];

export default function WorkshopRegistration() {
   const [currentStep, setCurrentStep] = useState(0);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formData, setFormData] = useState({
      workshopName: "",
      ownerName: "",
      address: "",
      state: "",
      city: "",
      phone: "",
      email: "",
      website: "",
      specializations: [],
      description: "",
      termsAccepted: false,
   });

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleCheckboxChange = (specialization: string) => {
      // @ts-ignore
      setFormData((prev) => ({
         ...prev,
         // @ts-ignore
         specializations: prev.specializations.includes(specialization)
            ? prev.specializations.filter((item) => item !== specialization)
            : [...prev.specializations, specialization],
      }));
   };

   const handleNext = () => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
   };

   const handlePrevious = () => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      setIsSubmitting(true);
      try {
         const response = await fetch("/api/add-workshop", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });
         const data = await response.json();
         if (response.ok) {
            toast.success("Workshop has been created");
         }
         console.log(data);
      } catch (error) {
         console.log(error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
         <Card>
            <CardHeader>
               <CardTitle>Register Your Workshop</CardTitle>
               <CardDescription>
                  Join our network of certified auto repair shops
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="mb-8">
                  <div className="flex justify-between">
                     {steps.map((step, index) => (
                        <div
                           key={step.id}
                           className="flex flex-col items-center"
                        >
                           <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                 index <= currentStep
                                    ? "bg-black text-white"
                                    : "bg-gray-200 text-gray-500"
                              }`}
                           >
                              {index < currentStep ? (
                                 <Check className="w-5 h-5" />
                              ) : (
                                 index + 1
                              )}
                           </div>
                           <span className="text-xs mt-1">{step.title}</span>
                        </div>
                     ))}
                  </div>
                  <div className="mt-2 h-1 w-full bg-gray-200">
                     <div
                        className="h-full bg-black transition-all duration-300 ease-in-out"
                        style={{
                           width: `${
                              (currentStep / (steps.length - 1)) * 100
                           }%`,
                        }}
                     />
                  </div>
               </div>

               <form onSubmit={handleSubmit}>
                  {currentStep === 0 && (
                     <div className="space-y-4">
                        <div>
                           <Label htmlFor="workshopName">Workshop Name</Label>
                           <Input
                              id="workshopName"
                              name="workshopName"
                              value={formData.workshopName}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                        <div>
                           <Label htmlFor="ownerName">Owner Name</Label>
                           <Input
                              id="ownerName"
                              name="ownerName"
                              value={formData.ownerName}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                     </div>
                  )}

                  {currentStep === 1 && (
                     <div className="space-y-4">
                        <div>
                           <Label htmlFor="address">Address</Label>
                           <Textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                        <div>
                           <Label htmlFor="phone">Phone</Label>
                           <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                        <div>
                           <Label htmlFor="email">Email</Label>
                           <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                        <div>
                           <Label htmlFor="email">City</Label>
                           <Input
                              id="city"
                              name="city"
                              type="text"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                        <div>
                           <Label htmlFor="email">State</Label>
                           <Input
                              id="state"
                              name="state"
                              type="text"
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                        <div>
                           <Label htmlFor="website">Website (optional)</Label>
                           <Input
                              id="website"
                              name="website"
                              type="url"
                              value={formData.website}
                              onChange={handleInputChange}
                           />
                        </div>
                     </div>
                  )}

                  {currentStep === 2 && (
                     <div className="space-y-4">
                        <Label>Specializations</Label>
                        <div className="grid grid-cols-2 gap-4">
                           {[
                              "General Repair",
                              "Engine",
                              "Transmission",
                              "Electrical",
                              "Brakes",
                              "Suspension",
                           ].map((spec: any, idx: number) => (
                              <div
                                 key={idx}
                                 className="flex items-center space-x-2"
                              >
                                 <Checkbox
                                    id={spec}
                                    checked={formData.specializations.includes(
                                       // @ts-ignore
                                       spec,
                                    )}
                                    onCheckedChange={() =>
                                       handleCheckboxChange(spec)
                                    }
                                 />
                                 <label htmlFor={spec}>{spec}</label>
                              </div>
                           ))}
                        </div>
                        <div>
                           <Label htmlFor="description">
                              Workshop Description
                           </Label>
                           <Textarea
                              id="description"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              placeholder="Tell us about your workshop..."
                           />
                        </div>
                     </div>
                  )}

                  {currentStep === 3 && (
                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                           Review Your Information
                        </h3>
                        <div className="space-y-2">
                           <p>
                              <strong>Workshop Name:</strong>{" "}
                              {formData.workshopName}
                           </p>
                           <p>
                              <strong>Owner Name:</strong> {formData.ownerName}
                           </p>
                           <p>
                              <strong>Address:</strong> {formData.address}
                           </p>
                           <p>
                              <strong>Phone:</strong> {formData.phone}
                           </p>
                           <p>
                              <strong>Email:</strong> {formData.email}
                           </p>
                           <p>
                              <strong>City:</strong> {formData.city}
                           </p>
                           <p>
                              <strong>State:</strong> {formData.state}
                           </p>
                           <p>
                              <strong>Website:</strong>{" "}
                              {formData.website || "N/A"}
                           </p>
                           <p>
                              <strong>Specializations:</strong>{" "}
                              {formData.specializations.join(", ")}
                           </p>
                           <p>
                              <strong>Description:</strong>{" "}
                              {formData.description}
                           </p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Checkbox
                              id="terms"
                              checked={formData.termsAccepted}
                              onCheckedChange={(checked: boolean) =>
                                 setFormData((prev) => ({
                                    ...prev,
                                    termsAccepted: checked,
                                 }))
                              }
                              required
                           />
                           <label htmlFor="terms" className="text-sm">
                              I agree to the terms and conditions
                           </label>
                        </div>
                     </div>
                  )}
               </form>
            </CardContent>
            <CardFooter className="flex justify-between">
               <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
               >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
               </Button>
               {currentStep < steps.length - 1 ? (
                  <Button onClick={handleNext}>
                     Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
               ) : (
                  <Button
                     onClick={handleSubmit}
                     disabled={!formData.termsAccepted || isSubmitting}
                     className={`${isSubmitting && "px-8"}`}
                  >
                     {isSubmitting ? (
                        <Loader className="animate-spin h-4 w-4 text-white" />
                     ) : (
                        "Submit Registration"
                     )}
                  </Button>
               )}
            </CardFooter>
         </Card>
      </div>
   );
}
