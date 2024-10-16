import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Workshop {
   id: number;
   name: string;
   description: string;
   town: string;
   city: string;
   rating: number;
   bookings: number;
   imageUrl: string;
}

const workshops: Workshop[] = [
   {
      id: 1,
      name: "Pottery Masterclass",
      description: "Learn the art of pottery from expert craftsmen.",
      town: "Stoke",
      city: "Staffordshire",
      rating: 4.8,
      bookings: 127,
      imageUrl: "/placeholder.png",
   },
   {
      id: 2,
      name: "Watercolor Painting",
      description: "Explore watercolor techniques with professional artists.",
      town: "Bath",
      city: "Somerset",
      rating: 4.6,
      bookings: 95,
      imageUrl: "/placeholder.png",
   },
   {
      id: 3,
      name: "Woodworking Basics",
      description:
         "Get hands-on experience with woodworking tools and techniques.",
      town: "Horsham",
      city: "West Sussex",
      rating: 4.9,
      bookings: 152,
      imageUrl: "/placeholder.png",
   },
   {
      id: 4,
      name: "Gourmet Cooking",
      description:
         "Learn to cook exquisite dishes from a Michelin-starred chef.",
      town: "York",
      city: "North Yorkshire",
      rating: 4.7,
      bookings: 203,
      imageUrl: "/placeholder.png",
   },
   {
      id: 5,
      name: "Digital Photography",
      description: "Master your DSLR and take stunning photos like a pro.",
      town: "Brighton",
      city: "East Sussex",
      rating: 4.5,
      bookings: 88,
      imageUrl: "/placeholder.png",
   },
   {
      id: 6,
      name: "Jewelry Making",
      description: "Create beautiful, handcrafted jewelry pieces.",
      town: "Birmingham",
      city: "West Midlands",
      rating: 4.8,
      bookings: 110,
      imageUrl: "/placeholder.png",
   },
];

export default function page() {
   return (
      <div className="container mx-auto px-4 py-8 w-5/6">
         <h1 className="text-3xl font-bold mb-6">Featured Workshops</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10">
            {workshops.map((workshop) => (
               <Card key={workshop.id} className="overflow-hidden w-96">
                  <img
                     src={workshop.imageUrl}
                     alt={workshop.name}
                     className="w-full h-56 object-cover"
                  />
                  <CardContent className="py-3 px-4">
                     <h2 className="text-xl font-semibold mb-2">
                        {workshop.name}
                     </h2>
                     <p className="text-sm text-gray-600 mb-2">
                        {workshop.description}
                     </p>
                     <p className="text-sm text-gray-500 mb-2">
                        {workshop.town}, {workshop.city}
                     </p>
                     <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                           {workshop.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                           ({workshop.bookings} bookings)
                        </span>
                     </div>
                  </CardContent>
                  <CardFooter className="py-1 px-4 pt-0">
                     <Button variant="outline" className="w-full">
                        View Workshop
                     </Button>
                  </CardFooter>
               </Card>
            ))}
         </div>
      </div>
   );
}
