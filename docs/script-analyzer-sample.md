# Script Analyzer — Sample Input/Output

A concrete example of what the AI-powered script analyzer will produce.

---

## Sample Input

**Platform**: YouTube  
**Target Duration**: 8 minutes  
**Script**:

```
Most creators waste 2 hours every day writing content that gets ignored.
I spent 6 months testing every AI writing tool available — and I found a system
that cuts my content creation time by 70%. In this video, I'm going to walk you
through the exact 3-step workflow I use every single week.

Step 1: Topic Research...
[Script continues for ~1100 words]

If this helped you, subscribe — I post every Tuesday with more creator workflow tips.
Download the free toolkit in the description.
```

---

## Sample Output

```json
{
  "wordCount": 1134,
  "estimatedDurationMinutes": 8,
  "hookStrength": "8/10",
  "hookAnalysis": {
    "score": 8,
    "strengths": [
      "Opens with a relatable pain point ('waste 2 hours')",
      "Establishes credibility ('6 months testing')",
      "Promises a specific, tangible outcome ('70% faster')",
      "Clear structure preview ('3-step workflow')"
    ],
    "improvements": [
      "Consider adding a visual hook description for thumbnail alignment",
      "The word 'I' appears before 'you' — reorder to lead with the viewer's benefit"
    ]
  },
  "retentionRisks": [
    {
      "timestamp": "~2:15",
      "issue": "Technical term introduced without visual aid — consider adding B-roll or screen recording",
      "severity": "medium"
    },
    {
      "timestamp": "~5:40",
      "issue": "Pacing slows — no new information for ~40 seconds",
      "severity": "high",
      "suggestion": "Insert a case study, stat, or quick demo here"
    }
  ],
  "ctaFeedback": {
    "detected": true,
    "quality": "good",
    "current": "subscribe — I post every Tuesday",
    "suggested": "Download the free toolkit in the description — I update it monthly with new templates"
  },
  "titleSuggestions": [
    "I Cut My Content Creation Time by 70% (Here's the Exact System)",
    "Stop Wasting 2 Hours a Day on Content — Do This Instead",
    "The 3-Step Creator Workflow That Changed Everything for Me"
  ],
  "tags": ["creator workflow", "content creation tips", "ai for creators", "youtube growth", "productivity for creators"],
  "platformTips": [
    "Add chapter markers at 0:00, 2:00, 4:30, 7:00",
    "Include transcript in description for SEO"
  ]
}
```

---

## How to Use (Current MVP)

```javascript
const { analyzeScript } = require('./src/scriptAnalyzer');

const result = analyzeScript(myScript, {
  platform: 'youtube',
  targetDurationMinutes: 8
});

console.log(result);
```

> **Note**: Full AI-powered output (as shown above) is coming in v1.0 with OpenAI API integration. The current MVP provides heuristic-based analysis.
