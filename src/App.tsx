import { useState, useEffect } from "react"
import { GameStep } from "./components/GameStep"
import { StoryTree } from "./components/StoryTree"
import { config } from "./prompt"
import "./index.css"

interface GameState {
  text: string
  options: string[]
}

interface GameHistory {
  text: string
  availableOptions: string[]
  selectedOption: string
}

export function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [history, setHistory] = useState<GameHistory[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateStory = async (selectedOption?: string, customHistory?: GameHistory[]) => {
    setIsLoading(true)
    
    const historyToUse = customHistory || history
    
    const payload = {
      history: historyToUse,
      selectedOption,
    }
    
    console.log(`📤 API: ${historyToUse.length} steps | Choice: "${selectedOption || 'START'}")`)
    
    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to generate story')
      }

      const newGameState = await response.json()
      setGameState(newGameState)
    } catch (error) {
      console.error('Error generating story:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionSelect = async (selectedOption: string) => {
    if (!gameState) return

    console.log(`🎮 Choice: "${selectedOption}" | History: ${history.length} → ${history.length + 1}`)

    const newHistory = [...history, {
      text: gameState.text,
      availableOptions: gameState.options,
      selectedOption,
    }]
    
    setHistory(newHistory)
    await generateStory(selectedOption, newHistory)
  }

  useEffect(() => {
    generateStory()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-2 sm:p-8 relative z-10 max-w-4xl">
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              {config.appName}
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-xl -z-10"></div>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg font-medium mt-2 px-4">
            {config.tagline}
          </p>
          {history.length > 0 && (
            <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-muted/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{config.stepLabel(history.length + 1)}</span>
            </div>
          )}
        </div>
        
        <StoryTree history={history} />
        
        {gameState && (
          <GameStep
            text={gameState.text}
            options={gameState.options}
            onOptionSelect={handleOptionSelect}
            isLoading={isLoading}
          />
        )}

        {!gameState && !isLoading && (
          <div className="text-center px-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 sm:p-6 max-w-md mx-auto">
              <p className="text-destructive font-medium text-sm sm:text-base">Failed to load game</p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-2">Please refresh the page to try again</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
