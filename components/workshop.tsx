"use client";

import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Workshop } from "@/app/api/add-workshop/route";
import { truncateText } from "@/utils/truncate";

export default function WorkshopComponent({
   workshop,
   idx,
}: {
   workshop: Workshop;
   idx: number;
}) {
   const [randomData, setRandomData] = React.useState({
      rating: "",
      bookings: 0,
   });

   React.useEffect(() => {
      const { rating, bookings } = generateRandomRatingAndBookings();
      setRandomData({ rating, bookings });
   }, []);

   return (
      <Card
         key={workshop._id}
         className="overflow-hidden w-96 h-[400px] shadow-none"
      >
         <Image
            src={
               idx <= 6
                  ? `/assets/image${idx + 1}.jpg`
                  : "/assets/workshop1.jpg"
            }
            alt={workshop.workshopName}
            width={200}
            height={200}
            className="w-full h-52 object-cover"
         />
         <CardContent className="py-3 px-4">
            <h2 className="text-xl font-semibold mb-2">
               {workshop.workshopName}
            </h2>
            <p className="text-sm text-gray-600 mb-2 text-clip">
               {truncateText(workshop.description, 50)}
            </p>
            <p className="text-sm text-gray-500 mb-2">
               {workshop.city}, {workshop.state}
            </p>
            <div className="flex items-center mb-2">
               <Star className="w-4 h-4 text-yellow-400 mr-1" />
               <span className="text-sm font-medium">{randomData.rating}</span>
               <span className="text-sm text-gray-500 ml-2">
                  ({randomData.bookings} bookings)
               </span>
            </div>
         </CardContent>
         <CardFooter className="py-1 px-4 pt-0 w-full">
            <Link href={`/workshops/${workshop._id}`} className="w-full">
               <Button
                  variant="outline"
                  className="w-full bg-black text-white hover:bg-black/80 hover:text-white"
               >
                  View Workshop
               </Button>
            </Link>
         </CardFooter>
      </Card>
   );
}

function generateRandomRatingAndBookings() {
   const rating = (Math.random() * 4 + 1).toFixed(1);
   const bookings = Math.floor(Math.random() * 500) + 1;
   return { rating, bookings };
}
