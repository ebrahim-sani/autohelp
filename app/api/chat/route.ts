import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "@/lib/config";
const apiKey = process.env.GEMINI_API_KEY;
const modelName = "tunedModels/intelligent-car-system-ajfwn7cjbey7";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI("AIzaSyDnSA0gfmj26HjMSvQv9iuPrU1UL130L2g");

const generationConfig = {
   temperature: 1,
   topP: 0.95,
   topK: 40,
   maxOutputTokens: 8192,
   responseMimeType: "text/plain",
};

export async function POST(req: Request) {
   if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
   }

   try {
      const { message } = await req.json();

      console.log(message);

      //gemini-1.5-flash
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const chatSession = model.startChat({
         generationConfig,
         history: [],
      });

      const result = await chatSession.sendMessage(message);

      const responseText = result.response.text();
      // console.log("Model Response:", responseText);

      return new Response(JSON.stringify({ response: responseText }), {
         status: 200,
         headers: { "Content-Type": "application/json" },
      });
   } catch (error) {
      console.error("Error:", error);

      return new Response(
         JSON.stringify({ error: "Failed to process the request" }),
         { status: 500, headers: { "Content-Type": "application/json" } },
      );
   }
}
