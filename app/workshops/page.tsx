"use client";

import * as React from "react";
import { Workshop } from "../api/add-workshop/route";
import WorkshopComponent from "@/components/workshop";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const getAllWorkshops = async (rootUrl: string) => {
   try {
      const response = await fetch(`${rootUrl}/api/get-all-workshops`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });

      const data = await response.json();
      return data;
   } catch (error) {
      console.error(error);
      return [];
   }
};

export default function WorkshopsPage() {
   const [workshops, setWorkshops] = useState<Workshop[]>([]);
   const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      const fetchWorkshops = async () => {
         const protocol = window.location.protocol;
         const host = window.location.host;
         const rootUrl = `${protocol}//${host}`;
         const fetchedWorkshops = await getAllWorkshops(rootUrl);
         setWorkshops(fetchedWorkshops);
         setFilteredWorkshops(fetchedWorkshops);
      };

      fetchWorkshops();
   }, []);

   useEffect(() => {
      const filtered = workshops.filter(
         (workshop) =>
            workshop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workshop.state.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredWorkshops(filtered);
   }, [searchTerm, workshops]);

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   return (
      <div className="container mx-auto px-4 py-8 w-5/6 flex flex-col items-center">
         <div className="flex items-center justify-between w-full mb-8 px-36">
            <h1 className="justify-self-start text-3xl font-bold">
               Featured Workshops
            </h1>

            <div className="relative">
               <Input
                  id="search"
                  placeholder="Search by state or city..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearchChange}
               />
               <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 justify-items-center">
            {filteredWorkshops.map((workshop, idx: number) => (
               <WorkshopComponent key={idx} idx={idx} workshop={workshop} />
            ))}
         </div>
      </div>
   );
}
