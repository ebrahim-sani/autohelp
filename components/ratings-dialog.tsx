"use client";

import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface RatingDialogProps {
   workshopId: string;
   onSubmit: (rating: number, review: string) => Promise<void>;
}

export function RatingDialog({ workshopId, onSubmit }: RatingDialogProps) {
   const [rating, setRating] = useState(0);
   const [review, setReview] = useState("");
   const [isOpen, setIsOpen] = useState(false);

   const handleSubmit = async () => {
      await onSubmit(rating, review);
      setIsOpen(false);
      setRating(0);
      setReview("");
   };

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button variant="outline">Rate Workshop</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Rate this Workshop</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center space-x-1 my-4">
               {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                     key={star}
                     className={`cursor-pointer ${
                        star <= rating
                           ? "text-yellow-400 fill-yellow-400"
                           : "text-gray-300"
                     }`}
                     onClick={() => setRating(star)}
                  />
               ))}
            </div>
            <Textarea
               placeholder="Write your review here..."
               value={review}
               onChange={(e) => setReview(e.target.value)}
               className="mb-4"
            />
            <Button onClick={handleSubmit} disabled={rating === 0}>
               Submit Review
            </Button>
         </DialogContent>
      </Dialog>
   );
}
