import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { config } from "../prompt"

interface GameStepProps {
  text: string
  options: string[]
  onOptionSelect: (option: string) => void
  isLoading?: boolean
}

export function GameStep({ text, options, onOptionSelect, isLoading = false }: GameStepProps) {
  const [customInput, setCustomInput] = useState("")

  const handleCustomSubmit = () => {
    if (customInput.trim()) {
      onOptionSelect(customInput.trim())
      setCustomInput("")
    }
  }
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border-muted shadow-xl">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{config.loadingText}</span>
                </div>
              </div>
              
              <div className="animate-pulse">
                <div className="h-4 sm:h-5 bg-gradient-to-r from-muted via-muted/60 to-muted rounded w-4/5 mx-auto mb-2 sm:mb-3"></div>
                <div className="h-4 sm:h-5 bg-gradient-to-r from-muted via-muted/60 to-muted rounded w-3/4 mx-auto mb-2 sm:mb-3"></div>
                <div className="h-4 sm:h-5 bg-gradient-to-r from-muted via-muted/60 to-muted rounded w-2/3 mx-auto mb-6 sm:mb-8"></div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className="h-12 sm:h-14 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-lg"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                  <div className="border-t border-muted pt-4">
                    <div className="flex gap-2 sm:gap-3">
                      <div className="flex-1 h-10 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-lg"></div>
                      <div className="w-12 h-10 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in duration-500">
      <Card className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border-muted shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative">
              <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 font-medium px-2">{text}</p>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-lg -z-10"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="group h-auto p-3 sm:p-4 text-left justify-start whitespace-normal border-2 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] touch-manipulation"
                  onClick={() => onOptionSelect(option)}
                  disabled={isLoading}
                >
                  <div className="flex items-center gap-3 w-full min-h-[40px]">
                    <div className="w-2 h-2 bg-primary/40 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all duration-200 flex-shrink-0"></div>
                    <span className="flex-1 text-base sm:text-lg font-medium leading-snug">{option}</span>
                  </div>
                </Button>
              ))}
            </div>

            <div className="border-t border-muted pt-4">
              <div className="flex gap-2 sm:gap-3">
                <Input
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={config.placeholder}
                  className="flex-1 text-sm sm:text-base"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleCustomSubmit()
                    }
                  }}
                />
                <Button
                  onClick={handleCustomSubmit}
                  disabled={isLoading || !customInput.trim()}
                  className="px-4 sm:px-6 whitespace-nowrap"
                >
                  {config.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}