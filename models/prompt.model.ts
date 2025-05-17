import { GoogleGenerativeAI } from "@google/generative-ai";

interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary?: string;
}

interface MessageResponse {
  message: string;
}

export const generatePromptFromLinkedInData = async (
  body: LinkedInProfile
): Promise<{ data?: MessageResponse; error?: string; invalid?: string }> => {
  return new Promise(async (resolve) => {
    try {
      if (!body || !body?.name || !body?.job_title || !body?.company) {
        return resolve({ invalid: "Missing required profile information" });
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Create a brief, personalized LinkedIn outreach message to ${body.name}, who works as a ${body.job_title} at ${
        body.company
      } in ${body.location || "their location"}.
        ${body.summary ? `Their profile summary: ${body.summary}` : ""}
        
        The message should:
        - Be brief (2-3 sentences)
        - Mention their name, role, and company
        - Mention that Outflo can help automate their outreach to increase meetings & sales
        - Suggest connecting
        - Be under 300 characters

        Format the response as only the message text with no additional formatting.
      `;

      const result = await model.generateContent(prompt);
      const response = result?.response;
      const messageText = response?.text()?.trim();
      if (!result || !response || !messageText) {
        return resolve({ error: "Error generating message" });
      }

      resolve({
        data: {
          message: messageText,
        },
      });
    } catch (error) {
      console.error("Error generating message with Gemini:", error);
      resolve({ error: "Server Error" });
    }
  });
};
