import os
import glob
import re
from datetime import datetime

# Find drafts
drafts = glob.glob('drafts/*.html')
if not drafts:
    print("No drafts to publish.")
    exit(0)

# Pick the first one alphabetically
drafts.sort()
draft_to_publish = drafts[0]
filename = os.path.basename(draft_to_publish)

with open(draft_to_publish, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract Title
title_match = re.search(r'<title>(.*?)</title>', content)
title = title_match.group(1).replace(' - CreatorTools', '').replace(' - CreatorCalc', '') if title_match else "New Creator Strategy Article"

# Generate Snippet
today = datetime.now().strftime("%B %d, %Y")
snippet = f"""
    <!-- Auto Published Article -->
    <a href="{filename}" class="blog-card">
      <div style="margin-bottom: 12px;"><span class="blog-tag">Creator Strategy</span></div>
      <h3>{title}</h3>
      <p>Master the latest strategies for content creation, monetization, and audience growth with our expert-led guides.</p>
      <div class="blog-meta">
        <span>By CreatorTools Team</span>
        <span>{today}</span>
      </div>
    </a>
"""

# Update blog/index.html
with open('blog/index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

index_content = index_content.replace('<div class="blog-grid" style="max-width: 800px; margin: 0 auto;">', f'<div class="blog-grid" style="max-width: 800px; margin: 0 auto;">\n{snippet}')

with open('blog/index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)

# Update layout to match other files (using update_layout.py logic if needed, but since the draft already has the proper footer/header, we just move it)
os.rename(draft_to_publish, f'blog/{filename}')
print(f"Successfully published {filename}")
