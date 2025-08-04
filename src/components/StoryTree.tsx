import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ChevronDown, ChevronRight, GitBranch } from "lucide-react"

interface StoryStep {
  text: string
  availableOptions: string[]
  selectedOption: string
}

interface StoryTreeProps {
  history: StoryStep[]
}

export function StoryTree({ history }: StoryTreeProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (history.length === 0) return null

  return (
    <div className="w-full max-w-2xl mx-auto mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <GitBranch className="w-4 h-4 mr-2" />
        Your Story Path ({history.length} steps)
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 ml-2" />
        ) : (
          <ChevronRight className="w-4 h-4 ml-2" />
        )}
      </Button>

      {isExpanded && (
        <Card className="mt-2 bg-muted/30 border-muted">
          <CardContent className="p-4">
            <div className="space-y-3">
              {history.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection line to next step */}
                  {index < history.length - 1 && (
                    <div className="absolute left-2 top-8 w-0.5 h-6 bg-primary/30" />
                  )}
                  
                  <div className="flex items-start gap-3">
                    {/* Step number circle */}
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center mt-1">
                      <span className="text-xs text-primary-foreground font-medium">
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Story text */}
                      <p className="text-sm text-foreground/80 leading-relaxed mb-1">
                        {step.text}
                      </p>
                      
                      {/* All available choices */}
                      <div className="space-y-1 mt-2">
                        {step.availableOptions.map((option, optionIndex) => {
                          const isSelected = option === step.selectedOption
                          return (
                            <div
                              key={optionIndex}
                              className={`inline-flex items-center gap-2 px-2 py-1 rounded-md mr-2 mb-1 ${
                                isSelected
                                  ? "bg-primary/20 border border-primary/30"
                                  : "bg-muted/50 border border-muted"
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isSelected ? "bg-primary" : "bg-muted-foreground/40"
                                }`}
                              />
                              <span
                                className={`text-xs font-medium ${
                                  isSelected ? "text-primary" : "text-muted-foreground"
                                }`}
                              >
                                {option}
                              </span>
                              {isSelected && (
                                <span className="text-xs text-primary">✓</span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Current position indicator */}
              <div className="flex items-start gap-3 opacity-60">
                <div className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                <span className="text-sm text-muted-foreground italic">
                  You are here...
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}