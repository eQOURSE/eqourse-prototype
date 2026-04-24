import re
import json
import os

with open('blog_content.txt', 'r', encoding='utf-8') as f:
    text = f.read()

blogs = []

# Parse EdTech blogs (17)
edtech_section = text.split('SECTION 2: Existing EdTech Blogs')[1].split('SECTION 3:')[0]
edtech_matches = re.finditer(r'Blog \d+: (.*?)\nCategory Tag: (.*?)\n', edtech_section)

for i, match in enumerate(edtech_matches):
    title = match.group(1).strip()
    slug = '/blog/' + re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    blogs.append({
        'id': i + 1,
        'title': title,
        'slug': slug,
        'category': 'EdTech',
        'date': 'April 2026',
        'author': 'eQOURSE',
        'excerpt': f'Explore insights on {title} and how it impacts the future of education and learning technology.',
        'thumbnailColor': 'teal',
        'sections': [],
        'internalLinks': ['/edtech-solutions'],
        'keywords': ['EdTech', 'Education', 'eQOURSE']
    })

# Parse AI Data blogs (17)
aidata_section = text.split('SECTION 3: New AI Data Services Blogs')[1].split('SECTION 4:')[0]
aidata_blocks = aidata_section.split('AI DATA BLOG')

for i, block in enumerate(aidata_blocks[1:]):
    if not block.strip(): continue
    
    # " 1 of 17 \n\nWhat Is AI Training Data? A Complete Guide for ML Teams in 2026\n"
    # Find the first non-empty line after "of 17"
    lines = [line.strip() for line in block.split('\n') if line.strip()]
    
    if len(lines) < 2: continue
    
    # lines[0] will be "1 of 17" or similar
    title = lines[1]
    
    slug_match = re.search(r'Slug: (.*?)(?:\n|$)', block)
    excerpt_match = re.search(r'Excerpt \(Card Preview\)\n(.*?)(?:\n\n|\nArticle)', block, re.DOTALL)
    
    slug = slug_match.group(1).strip() if slug_match else '/blog/' + re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    excerpt = excerpt_match.group(1).strip() if excerpt_match else ''
    
    # Extract sections
    sections = []
    outline_match = re.search(r'Article Outline \(H2 Sections\)\n(.*?)(?:\n\nInternal)', block, re.DOTALL)
    if outline_match:
        for line in outline_match.group(1).strip().split('\n'):
            line = line.strip()
            if line and not line.startswith('Article Outline'):
                sections.append({'title': line, 'level': 'h2'})
                
    # Extract internal links
    links = []
    links_match = re.search(r'Internal Links to Include in Article Body\n(.*?)(?:\n\nThumbnail)', block, re.DOTALL)
    if links_match:
        for line in links_match.group(1).strip().split('\n'):
            line = line.strip()
            if line:
                links.append(line)
                
    blogs.append({
        'id': 17 + i + 1,
        'title': title,
        'slug': slug,
        'category': 'AI Data',
        'date': 'April 2026',
        'author': 'eQOURSE',
        'excerpt': excerpt.replace('\n', ' '),
        'thumbnailColor': 'navy',
        'sections': sections,
        'internalLinks': links,
        'keywords': ['AI Data', 'Machine Learning', 'eQOURSE']
    })

ts_content = f'''export interface BlogPost {{
  id: number;
  title: string;
  slug: string;
  category: 'EdTech' | 'AI Data';
  date: string;
  author: string;
  excerpt: string;
  thumbnailColor: 'teal' | 'navy';
  sections?: {{ title: string; level: 'h2' | 'h3' }}[];
  internalLinks?: string[];
  keywords?: string[];
}}

export const blogsData: BlogPost[] = {json.dumps(blogs, indent=2)};
'''

with open('src/components/blog/blogData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated {len(blogs)} blogs")
