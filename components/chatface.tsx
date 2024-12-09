"use client";

import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { config } from "@/lib/config";
import MarkdownRenderer from "@/lib/markdownRenderer";

function ChatFace() {
   const [inputValue, setInputValue] = useState("");
   const [messages, setMessages] = useState<any[]>([
      // { sender: "User", content: "Hello!" },
      // { sender: "AI", content: "Hello! How can I assist you today?" },
      // { sender: "User", content: "my car is not starting." },
      // {
      //    sender: "AI",
      //    content:
      //       "I'm sorry to hear that your car isn't starting. Here are few things to check that could help troubleshoot?",
      // },
      // { sender: "User", content: "Can you explain the useEffect hook?" },
      // {
      //    sender: "AI",
      //    content:
      //       "The useEffect hook in React is used for side effects in function components. It serves a similar purpose to componentDidMount, componentDidUpdate, and componentWillUnmount in class components, but unified into a single API.",
      // },
      // {
      //    sender: "User",
      //    content: "That's helpful, thanks! Can you give an example?",
      // },
   ]);

   const chatEndRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>,
   ) => {
      setInputValue(event.target.value);
   };

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (inputValue.trim() !== "") {
         const userMessage = { sender: "User", content: inputValue.trim() };
         setMessages((prevMessages) => [...prevMessages, userMessage]);
         setInputValue("");

         try {
            const res = await fetch("/api/chat", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ message: userMessage.content }),
            });
            const data = await res.json();
            if (res.ok) {
               const aiMessage = { sender: "AI", content: data.response };
               setMessages((prevMessages) => [...prevMessages, aiMessage]);
            } else {
               console.error("Error from API:", data);
            }
         } catch (error) {
            console.error("Error sending message:", error);
         }
      }
   };

   return (
      <>
         <div className="relative flex h-[70vh] 2xl:h-[86vh] flex-col rounded-xl bg-muted/50 p-4 items-center md:w-2/5">
            {/* <Badge variant="outline" className="absolute right-3 top-3">
               Output
            </Badge> */}

            <div className="flex flex-1 h-full w-full space-y-4">
               <ScrollArea className="flex-auto w-full h-[90%] mb-4 pr-4">
                  {messages.map((message, index) => (
                     <div
                        key={index}
                        className={`flex ${
                           message.sender === "User"
                              ? "justify-end"
                              : "justify-start"
                        }`}
                     >
                        <div
                           className={`max-w-[80%] rounded-lg p-3 my-2 ${
                              message.sender === "User"
                                 ? "bg-blue-200 text-primary-foreground"
                                 : "bg-pink-200 text-secondary-foreground"
                           }`}
                        >
                           <p className="text-sm">
                              {message.sender === "AI" ? (
                                 <MarkdownRenderer markdown={message.content} />
                              ) : (
                                 <p> {message.content}</p>
                              )}
                           </p>
                        </div>
                     </div>
                  ))}
                  <div ref={chatEndRef} />
               </ScrollArea>
            </div>

            <form
               onSubmit={handleSubmit}
               className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring w-full"
            >
               <Label htmlFor="message" className="sr-only">
                  Message
               </Label>
               <Textarea
                  id="message"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
               />
               <div className="flex items-center p-3 pt-0">
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button type="button" variant="ghost" size="icon">
                              <Paperclip className="size-4" />
                              <span className="sr-only">Attach file</span>
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                     </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button type="button" variant="ghost" size="icon">
                              <Mic className="size-4" />
                              <span className="sr-only">Use Microphone</span>
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                           Use Microphone
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
                  <Button type="submit" size="sm" className="ml-auto gap-1.5">
                     Send Message
                     <CornerDownLeft className="size-3.5" />
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}

export default ChatFace;
