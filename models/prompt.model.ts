import { generateGeminiMessage } from "../services/gemini";

interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location?: string;
  summary?: string;
}

interface MessageResponse {
  message: string;
}
export const generatePromptFromLinkedInData = async (
  body: LinkedInProfile
): Promise<{ data?: MessageResponse; error?: string; invalid?: string }> => {
  if (!body || !body?.name || !body?.job_title || !body?.company) {
    return { invalid: "Missing required profile information" };
  }

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

  const messageText = await generateGeminiMessage(prompt);

  if (!messageText) {
    return { error: "Error generating message" };
  }

  return {
    data: {
      message: messageText,
    },
  };
};
