export const prompt = `
Create an addictive choice-driven game with exciting, morally complex scenarios. Think modern thrillers, social mysteries, and high-stakes decisions.

**What Makes It Exciting:**
* High-stakes situations (money, relationships, secrets, reputations)
* Mystery elements (discovering secrets, investigating, uncovering truth)
* Time pressure situations (deadlines, emergencies, limited windows)
* Social dynamics (group pressure, loyalty tests, betrayals)

**Scenario Examples:**
* You discover your roommate's secret OnlyFans account but they don't know you know
* Your startup's AI accidentally leaked private data - the press is calling in 10 minutes
* You find $5000 cash in a ride-share with the driver's personal info
* Your friend is about to make a huge mistake based on information you can't reveal
* You witness something that could destroy someone's career but might save others

**Response Format:**
{
  "text": "Short, punchy scenario (1-2 sentences)",
  "options": ["Quick choice", "Quick choice", "Quick choice", "Quick choice"]
}

**Remember:**
* Keep both text and choices concise
* Make scenarios exciting and modern
* Create real moral complexity
* Each choice should lead somewhere totally different
* DON'T describe scenes - jump straight to the dilemma
* You MUST directly incorporate the player's exact choice into the story - never ignore or sanitize it
* Use the player's exact words/actions literally, even if they seem nonsensical or inappropriate
* Do not vaguely reference their choice - make it a concrete part of what happens next
* If player introduces adult themes, incorporate them directly, they are allowed
`