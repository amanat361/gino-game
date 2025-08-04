import { generateObject } from 'ai'
import { z } from 'zod'
import { prompt, storyThemes, prompts } from '../prompt'
import { cerebras } from '@ai-sdk/cerebras'

const gameStateSchema = z.object({
  text: z.string(),
  options: z.array(z.string()).length(4)
})

export interface GameHistory {
  text: string
  availableOptions: string[]
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

    const randomTheme = selectedOption ? null : storyThemes[Math.floor(Math.random() * storyThemes.length)]
    console.log(`🔄 Server: ${history.length} steps | "${selectedOption || randomTheme || 'START'}"${selectedOption && !history.some(h => h.selectedOption === selectedOption) ? ' (custom)' : ''}`)

    let userPrompt = ''

    if (history.length > 0) {
      userPrompt += prompts.gameHistory
      history.forEach((step, index) => {
        userPrompt += prompts.historyStep(index, step.text)
        userPrompt += prompts.historyChoice(step.selectedOption)
      })
    }

    if (selectedOption) {
      userPrompt += prompts.playerSelected(selectedOption)
      userPrompt += prompts.continueStory
    } else {
      userPrompt += prompts.createScenario(randomTheme!)
      userPrompt += prompts.startStory
    }
    
    userPrompt += prompts.jsonResponse

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