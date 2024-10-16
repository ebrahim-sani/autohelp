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

function ChatFace() {
   const [inputValue, setInputValue] = useState("");
   const [messages, setMessages] = useState([
      { sender: "AI", content: "Hello! How can I assist you today?" },
      { sender: "User", content: "Hi! I have a question about React hooks." },
      {
         sender: "AI",
         content:
            "Sure, I'd be happy to help. What specific question do you have about React hooks?",
      },
      { sender: "User", content: "Can you explain the useEffect hook?" },
      {
         sender: "AI",
         content:
            "The useEffect hook in React is used for side effects in function components. It serves a similar purpose to componentDidMount, componentDidUpdate, and componentWillUnmount in class components, but unified into a single API.",
      },
      {
         sender: "User",
         content: "That's helpful, thanks! Can you give an example?",
      },
      {
         sender: "AI",
         content:
            "Of course! Here's a simple example of useEffect:\n\n```jsx\nimport React, { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nIn this example, useEffect updates the document title every time the component renders, including after the count state changes.",
      },
   ]);

   const chatEndRef = useRef(null);

   useEffect(() => {
      //@ts-ignore
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>,
   ) => {
      setInputValue(event.target.value);
   };

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (inputValue.trim() !== "") {
         const newMessage = { sender: "User", content: inputValue.trim() };
         setMessages([...messages, newMessage]);
         setInputValue("");
         // Here you would typically send the message to your AI backend
         // and then add the AI's response to the messages
      }
   };

   return (
      <>
         <div className="relative flex h-[70vh] 2xl:h-[86vh] flex-col rounded-xl bg-muted/50 p-4 items-center md:w-2/3">
            <Badge variant="outline" className="absolute right-3 top-3">
               Output
            </Badge>

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
                           <p className="text-sm">{message.content}</p>
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
