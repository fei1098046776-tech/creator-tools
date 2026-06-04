/**
 * metadataGenerator.js
 *
 * MVP prototype: Generates SEO-optimized metadata for creator content.
 * In production, this will use OpenAI API for dynamic, context-aware generation.
 * Currently uses template-based generation as a working baseline.
 */

const PLATFORM_CONFIGS = {
  youtube: {
    titleMaxLength: 100,
    descriptionMaxLength: 5000,
    maxTags: 500, // characters
  },
  tiktok: {
    titleMaxLength: 150,
    descriptionMaxLength: 2200,
    maxHashtags: 30,
  },
  instagram: {
    captionMaxLength: 2200,
    maxHashtags: 30,
  },
};

/**
 * Generate metadata for a piece of content.
 * @param {Object} input - Content details
 * @param {string} input.topic - Main topic or product name
 * @param {string} input.audience - Target audience description
 * @param {string} input.platform - 'youtube' | 'tiktok' | 'instagram'
 * @param {string} input.tone - 'professional' | 'casual' | 'fun'
 * @param {string[]} [input.keywords] - Optional seed keywords
 * @returns {Object} Generated metadata object
 */
function generateMetadata(input) {
  const { topic, audience, platform = 'youtube', tone = 'casual', keywords = [] } = input;

  if (!topic) throw new Error('topic is required');
  if (!audience) throw new Error('audience is required');

  const config = PLATFORM_CONFIGS[platform];
  if (!config) throw new Error(`Unsupported platform: ${platform}`);

  // Build keyword pool
  const keywordPool = [
    topic.toLowerCase(),
    ...keywords.map(k => k.toLowerCase()),
    audience.toLowerCase().split(' ')[0],
    platform,
    '2026',
  ];

  // Title templates by tone
  const titleTemplates = {
    professional: [
      `How ${audience} Can Use ${topic} to Grow in 2026`,
      `${topic}: A Complete Guide for ${audience}`,
      `The Ultimate ${topic} Strategy for ${audience}`,
    ],
    casual: [
      `I tried ${topic} for 30 days — here's what happened`,
      `${topic} changed everything for me (and it can for you too)`,
      `Why every ${audience} needs to know about ${topic}`,
    ],
    fun: [
      `POV: You finally figured out ${topic} 🎉`,
      `${topic} hits different when you actually know what you're doing`,
      `Nobody told me ${topic} was this easy 😅`,
    ],
  };

  const titles = titleTemplates[tone] || titleTemplates.casual;

  // Generate hashtags / tags
  const hashtags = keywordPool
    .map(k => `#${k.replace(/\s+/g, '')}`)
    .concat(['#fyp', '#creator', '#2026'])
    .slice(0, 15);

  // Description template
  const description = `In this ${platform === 'youtube' ? 'video' : 'post'}, we explore ${topic} — specifically for ${audience}. Whether you're just getting started or looking to level up, this breaks it all down step by step.\n\n${keywords.length > 0 ? `Topics covered: ${keywords.join(', ')}` : ''}\n\n${hashtags.join(' ')}`.trim();

  return {
    platform,
    titleOptions: titles,
    description: description.slice(0, config.descriptionMaxLength || config.captionMaxLength),
    hashtags,
    keywords: keywordPool,
    note: 'Full AI-powered generation (via OpenAI API) coming in v1.0',
  };
}

// Example usage
if (typeof module !== 'undefined') {
  module.exports = { generateMetadata };
}

// Browser usage example:
// const meta = generateMetadata({
//   topic: 'AI tools for Shopify sellers',
//   audience: 'beginner ecommerce creators',
//   platform: 'tiktok',
//   tone: 'fun',
//   keywords: ['shopify automation', 'aigc', 'tiktok shop']
// });
// console.log(meta);
