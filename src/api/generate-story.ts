import { generateObject } from 'ai'
import { z } from 'zod'
import { prompt } from '../prompt'
import { cerebras } from '@ai-sdk/cerebras'

const startingCategories = [
  "You discover your memories are being sold as entertainment", "An AI offers to delete your worst mistake from everyone's memory",
  "You can save one person but doom five strangers", "Your clone wants to take over your life", 
  "You find a button that kills one random person but gives you $1 million", "Time travelers offer to prevent your birth to save the world",
  "You must choose who gets the last dose of life-saving medicine", "An alien species judges humanity based on your next decision",
  "You can erase one person from existence or let millions suffer", "Your future self begs you to make a terrible choice",
  "A machine lets you experience anyone's death - for a price", "You discover you're the only real person in a simulation",
  "A genie grants wishes but someone else pays the cost", "You can prevent a tragedy but it will cause a worse one",
  "An app shows you everyone who secretly hates you", "You find out your pet has been recording your conversations",
  "A stranger offers to swap lives with you permanently", "You receive a device that shows people's remaining lifespan",
  "Your shadow starts making independent decisions", "A lottery gives away years of life instead of money",
  "You discover your dreams are someone else's reality", "A pill makes you irresistibly honest for 24 hours",
  "You can make one lie become retroactively true", "Everyone except you forgets a major historical event",
  "A machine can transfer your consciousness to anyone's body", "You find a portal to a world where you never existed",
  "Your reflection starts acting independently", "A device lets you feel everyone's emotions within a mile",
  "You can trade any memory for any skill", "A company offers to buy your last day alive",
  "You discover your thoughts are being broadcast to strangers", "A virus makes people tell the truth when they sneeze"
]

const gameStateSchema = z.object({
  text: z.string(),
  options: z.array(z.string()).length(4)
})

export interface GameHistory {
  text: string
  selectedOption: string
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await request.json()
    const { history = [], selectedOption = null } = body as {
      history?: GameHistory[]
      selectedOption?: string | null
    }

    const randomCategory = selectedOption ? null : startingCategories[Math.floor(Math.random() * startingCategories.length)]
    console.log(`🔄 Server: ${history.length} steps | "${selectedOption || randomCategory || 'START'}"${selectedOption && !history.some(h => h.selectedOption === selectedOption) ? ' (custom)' : ''}`)

    let userPrompt = ''

    if (history.length > 0) {
      userPrompt += `Game history:\n`
      history.forEach((step, index) => {
        userPrompt += `Step ${index + 1}: ${step.text}\n`
        userPrompt += `Player chose: ${step.selectedOption}\n\n`
      })
    }

    if (selectedOption) {
      userPrompt += `The player just selected: "${selectedOption}"\n`
      userPrompt += `Generate the next step based on this choice.`
    } else {
      userPrompt += `Create a starting scenario based on: ${randomCategory}\n`
      userPrompt += `Make it immediately present a moral dilemma with high stakes.`
    }
    
    userPrompt += `\n\nReturn your response as a JSON object with the specified schema.`

    const { object } = await generateObject({
      model: cerebras("llama-4-scout-17b-16e-instruct"),
      schema: gameStateSchema,
      system: prompt,
      prompt: userPrompt,
      temperature: 0.9
    });

    console.log(`✅ AI: "${object.text.slice(0, 50)}${object.text.length > 50 ? '...' : ''}"`)

    return new Response(JSON.stringify(object), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error generating story:', error)
    return new Response('Internal server error', { status: 500 })
  }
}