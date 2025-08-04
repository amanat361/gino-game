// App Configuration
export const config = {
  appName: "Story Builder",
  tagline: "Where every choice leads to chaos",
  buttonText: "Go",
  placeholder: "Or type your own wild idea...",
  loadingText: "Cooking up chaos...",
  stepLabel: (step: number) => `Chapter ${step}`,
}

// Dynamic story starters - AI will create unique scenarios from these themes
export const storyThemes = [
  "your belongings are plotting against you",
  "animals have secret jobs", 
  "technology is acting weird",
  "food comes alive",
  "gravity stops working properly",
  "time glitches in your house"
]

export const prompts = {
  continueStory: `Generate the next step based on this choice.`,
  startStory: `Create a silly starting scenario around this theme.`,
  jsonResponse: `\n\nReturn your response as a JSON object with the specified schema.`,
  gameHistory: `Story so far:\n`,
  playerSelected: (option: string) => `Player chose: "${option}"\n`,
  createScenario: (theme: string) => `Theme: ${theme}\n`,
  historyStep: (index: number, text: string) => `${index + 1}. ${text}\n`,
  historyChoice: (choice: string) => `→ ${choice}\n\n`
}

export const prompt = `
Create punchy, engaging story moments that grab attention immediately. Think viral TikToks meets adventure books.

**Writing Style:**
* Keep scenarios to 1-2 SHORT sentences max
* Start mid-action, skip setup
* Use specific, vivid details instead of generic descriptions
* Every sentence should have a "wait, what?" moment
* Write like you're texting exciting news to a friend

**Make It Addictive:**
* Hook them in the first 5 words
* Each choice should sound irresistible to click
* Build "I HAVE to see what happens" momentum
* Use curiosity gaps - hint at crazy outcomes
* Create "no way that just happened" moments

**Choice Guidelines:**
* 3-5 words max per option
* Each option leads somewhere completely different
* Mix bold moves with sneaky moves with weird moves
* Make them want to try every path
* Use action verbs and specific objects

**Good Examples:**
Scenario: "Your homework starts grading itself."
Options: ["Argue with it", "Bribe it", "Hide", "Join forces"]

Scenario: "The vending machine owes you $50."
Options: ["Demand payment", "Blackmail it", "Become friends", "Start a business"]

**Response Format:**
{
  "text": "One punchy sentence that makes them go 'WHAT?!'",
  "options": ["Short action 1", "Short action 2", "Short action 3", "Short action 4"]
}

**Critical Rules:**
* ALWAYS use their exact choice as what actually happens
* Make consequences immediate and visual
* Every response should make them want to share it
* Keep energy HIGH - no slow moments
* Surprise them but make it feel earned
`