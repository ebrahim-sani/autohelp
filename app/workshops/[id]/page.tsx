"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   CheckCircle,
   Mail,
   MapPin,
   Phone,
   Facebook,
   Twitter,
   Linkedin,
   Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Workshop } from "@/app/api/add-workshop/route";
import { RatingDialog } from "@/components/ratings-dialog";
import { useEffect, useState } from "react";

interface Employee {
   id: number;
   name: string;
   role: string;
   image: string;
}

interface WorkshopProfile {
   name: string;
   verified: boolean;
   description: string;
   address: string;
   phone: string;
   email: string;
   website: string;
   master: {
      name: string;
      image: string;
      experience: string;
   };
   employees: Employee[];
   socialMedia: {
      facebook: string;
      twitter: string;
      linkedin: string;
   };
}

const workshopData: WorkshopProfile = {
   name: "Artisan Woodcraft Workshop",
   verified: true,
   description:
      "Premier woodworking studio specializing in custom furniture and artistic wooden crafts. Established in 1995, we combine traditional techniques with modern innovation.",
   address: "123 Craft Street, Artisan Quarter, Manchester, M1 1AB",
   phone: "+44 (0) 123 456 7890",
   email: "contact@artisanwoodcraft.com",
   website: "www.artisanwoodcraft.com",
   master: {
      name: "James Wilson",
      image: "/placeholder.svg?height=150&width=150",
      experience: "Master Craftsman with 25 years of experience",
   },
   employees: [
      {
         id: 1,
         name: "Sarah Thompson",
         role: "Senior Woodworker",
         image: "/placeholder.svg?height=100&width=100",
      },
      {
         id: 2,
         name: "Michael Chen",
         role: "Furniture Designer",
         image: "/placeholder.svg?height=100&width=100",
      },
      {
         id: 3,
         name: "Emma Roberts",
         role: "Apprentice Craftsperson",
         image: "/placeholder.svg?height=100&width=100",
      },
   ],
   socialMedia: {
      facebook: "https://facebook.com/artisanwoodcraft",
      twitter: "https://twitter.com/artisanwood",
      linkedin: "https://linkedin.com/company/artisanwoodcraft",
   },
};

export default function page({ params }: { params: { id: string } }) {
   const [workshop, setWorkshop] = useState<Workshop | null>(null);
   const [averageRating, setAverageRating] = useState(0);
   const [reviews, setReviews] = useState([]);

   useEffect(() => {
      const fetchWorkshop = async () => {
         const res = await fetch(`/api/get-workshop`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: params.id }),
         });
         const data = await res.json();
         setWorkshop(data);
      };

      const fetchRatings = async () => {
         const res = await fetch(`/api/get-ratings?workshopId=${params.id}`);
         const data = await res.json();
         setAverageRating(data.averageRating);
         setReviews(data.reviews);
      };

      fetchWorkshop();
      fetchRatings();
   }, [params.id]);

   const handleRatingSubmit = async (rating: number, review: string) => {
      const res = await fetch("/api/add-rating", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ workshopId: params.id, rating, review }),
      });
      if (res.ok) {
         // Refresh ratings after submission
         const updatedRatings = await fetch(
            `/api/get-ratings?workshopId=${params.id}`,
         );
         const data = await updatedRatings.json();
         setAverageRating(data.averageRating);
         setReviews(data.reviews);
      }
   };

   if (!workshop) return <div>Loading...</div>;

   return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
         <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
               <Avatar className="w-24 h-24">
                  <AvatarImage src="" alt={workshop.workshopName} />
                  <AvatarFallback>{workshop.workshopName[0]}</AvatarFallback>
               </Avatar>
               <div>
                  <div className="flex items-center gap-2">
                     <h1 className="text-3xl font-bold">
                        {workshop.workshopName}
                     </h1>
                     <Badge variant="secondary" className="ml-2">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                     </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">
                     {workshop.website}
                  </p>
                  <div className="flex items-center mt-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                           key={star}
                           className={`w-5 h-5 ${
                              star <= averageRating
                                 ? "text-yellow-400 fill-yellow-400"
                                 : "text-gray-300"
                           }`}
                        />
                     ))}
                     <span className="ml-2 text-sm text-muted-foreground">
                        ({reviews.length} reviews)
                     </span>
                  </div>
               </div>
            </div>
            <RatingDialog
               workshopId={params.id}
               onSubmit={handleRatingSubmit}
            />
         </div>

         <Card className="mb-8">
            <CardHeader>
               <CardTitle>About the Workshop</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground">{workshop?.description}</p>
               <div className="grid gap-4 mt-6">
                  <div className="flex items-center gap-2">
                     <MapPin className="w-5 h-5 text-muted-foreground" />
                     <span>{workshop?.address},</span>
                     <span> {workshop?.city}</span>
                     <span> {workshop?.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Phone className="w-5 h-5 text-muted-foreground" />
                     <span>{workshop?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Mail className="w-5 h-5 text-muted-foreground" />
                     <span>{workshop?.email}</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="mb-8">
            <CardHeader>
               <CardTitle>Master Craftsman</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                     <AvatarImage src="" alt="" />
                     <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                     <h3 className="font-semibold text-lg">
                        {workshop?.ownerName}
                     </h3>
                     <p className="text-muted-foreground">
                        Expert in Automobile
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="mb-8">
            <CardHeader>
               <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4">
                  {workshop?.specializations?.map((spec, i) => (
                     <Badge key={i}>{spec}</Badge>
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="mb-8">
            <CardHeader>
               <CardTitle>Our Team</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid gap-6">
                  {workshopData?.employees?.map((employee) => (
                     <div key={employee.id} className="flex items-center gap-4">
                        <Avatar>
                           <AvatarImage
                              src={employee.image}
                              alt={employee.name}
                           />
                           <AvatarFallback>
                              {employee.name
                                 .split(" ")
                                 .map((n) => n[0])
                                 .join("")}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                           <h3 className="font-semibold">{employee.name}</h3>
                           <p className="text-sm text-muted-foreground">
                              {employee.role}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Connect With Us</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex gap-4">
                  <Link
                     href={workshopData.socialMedia.facebook}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Button variant="outline" size="icon">
                        <Facebook className="w-4 h-4" />
                        <span className="sr-only">Facebook</span>
                     </Button>
                  </Link>
                  <Link
                     href={workshopData.socialMedia.twitter}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Button variant="outline" size="icon">
                        <Twitter className="w-4 h-4" />
                        <span className="sr-only">Twitter</span>
                     </Button>
                  </Link>
                  <Link
                     href={workshopData.socialMedia.linkedin}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Button variant="outline" size="icon">
                        <Linkedin className="w-4 h-4" />
                        <span className="sr-only">LinkedIn</span>
                     </Button>
                  </Link>
               </div>
            </CardContent>
         </Card>

         <Card className="mt-8">
            <CardHeader>
               <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
               {reviews.map((review: any, index: number) => (
                  <div key={index} className="mb-4">
                     <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                           <Star
                              key={star}
                              className={`w-4 h-4 ${
                                 star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                              }`}
                           />
                        ))}
                     </div>
                     <p className="text-sm text-muted-foreground">
                        {review.review}
                     </p>
                  </div>
               ))}
            </CardContent>
         </Card>
      </div>
   );
}
