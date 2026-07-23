import Anthropic from "@anthropic-ai/sdk";

// Singleton Anthropic client — imported by API routes
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

/** Quick helper: send one user message and get the text response */
export async function ask(prompt: string, maxTokens = 1000): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: maxTokens,
    messages: [{ role: "user", content: prompt }],
  });
  const block = message.content[0];
  return block.type === "text" ? block.text : "";
}

/** Parse JSON from an LLM response — strips markdown fences */
export function parseJSON<T = unknown>(text: string): T | null {
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim()) as T;
  } catch {
    return null;
  }
}
