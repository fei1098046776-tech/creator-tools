/**
 * scriptAnalyzer.js
 * 
 * MVP prototype: Analyzes a video script and returns structured feedback.
 * In production, this will use OpenAI API for deep LLM-powered analysis.
 * Currently uses heuristic rules as a working baseline.
 */

/**
 * Analyze a video script and return structured feedback.
 * @param {string} script - The full video script text
 * @param {Object} options - Optional configuration
 * @param {number} options.targetDurationMinutes - Target video length in minutes
 * @param {string} options.platform - Target platform ('youtube' | 'tiktok' | 'instagram')
 * @returns {Object} Analysis result with hook, retention, cta, and suggestions
 */
function analyzeScript(script, options = {}) {
  const { targetDurationMinutes = 10, platform = 'youtube' } = options;

  if (!script || typeof script !== 'string') {
    throw new Error('Script must be a non-empty string');
  }

  const words = script.split(/\s+/).filter(Boolean);
  const sentences = script.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const wordCount = words.length;

  // --- Hook Analysis ---
  const firstSentences = sentences.slice(0, 3).join(' ').toLowerCase();
  const hookKeywords = ['you', 'your', 'secret', 'why', 'how', 'never', 'always', 'mistake', 'surprising', 'shocking'];
  const hookScore = hookKeywords.filter(kw => firstSentences.includes(kw)).length;
  const hookStrength = Math.min(10, hookScore * 2 + 2);

  // --- CTA Detection ---
  const ctaPatterns = ['subscribe', 'follow', 'comment', 'like', 'share', 'click', 'link in bio', 'download', 'sign up'];
  const hasCTA = ctaPatterns.some(p => script.toLowerCase().includes(p));
  const ctaQuality = hasCTA ? 'CTA detected' : 'No clear CTA found — add a call to action';

  // --- Retention Risk (simple pacing check) ---
  const avgWordsPerSentence = wordCount / Math.max(sentences.length, 1);
  const retentionRisks = [];
  if (avgWordsPerSentence > 25) {
    retentionRisks.push('Sentences are long — consider breaking them up for better pacing');
  }
  if (wordCount < 300 && targetDurationMinutes >= 5) {
    retentionRisks.push('Script may be too short for the target video length');
  }

  // --- Platform-specific suggestions ---
  const platformSuggestions = {
    youtube: ['Add chapter markers every 2-3 minutes', 'Include a strong thumbnail hook in your opening line'],
    tiktok: ['Hook must land in first 1-2 seconds', 'Keep total script under 60 seconds for best reach'],
    instagram: ['Lead with visual description', 'End with a question to boost comments'],
  };

  return {
    wordCount,
    estimatedDurationMinutes: Math.round(wordCount / 130), // avg speaking pace
    hookStrength: `${hookStrength}/10`,
    ctaFeedback: ctaQuality,
    retentionRisks: retentionRisks.length > 0 ? retentionRisks : ['No major retention risks detected'],
    platformTips: platformSuggestions[platform] || [],
    note: 'Full AI-powered analysis (via OpenAI API) coming in v1.0',
  };
}

// Example usage
if (typeof module !== 'undefined') {
  module.exports = { analyzeScript };
}

// Browser usage example:
// const result = analyzeScript("Your script text here...", { platform: 'youtube', targetDurationMinutes: 10 });
// console.log(result);
