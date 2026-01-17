# Social Preview Meta Tags - PromptMastery

## 1. Summary (for humans)

PromptMastery is an interactive educational web platform designed to help developers master LLM optimization techniques for building production-ready AI applications. The project provides a comprehensive collection of 30+ optimization patterns covering agentic architecture, retrieval-augmented generation (RAG) systems, security best practices, and performance optimization. Each technique includes theoretical foundations, practical code examples, and interactive quizzes to reinforce learning. Built with React and TypeScript, it's deployed on GitHub Pages and serves as a progressive learning resource for AI developers.

**Project Details:**
- **Primary use case**: Educational platform for learning production-ready LLM optimization patterns and prompt engineering techniques
- **Target audience**: Software developers and AI engineers building production AI applications with Large Language Models
- **Key benefits**:
  - 30+ battle-tested optimization techniques with real-world examples
  - Interactive learning experience with quizzes and progress tracking
  - Comprehensive coverage of agentic architecture, RAG systems, security, and performance
  - Production-ready patterns with trade-off analysis and compatibility guidance

## 2. HTML_HEAD_SNIPPET

```html
<!-- Social & SEO meta for https://github.com/voku/PromptMastery -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- Primary Meta Tags -->
  <title>PromptMastery - Master LLM Optimization & Prompt Engineering</title>
  <meta name="title" content="PromptMastery - Master LLM Optimization & Prompt Engineering">
  <meta name="description" content="Interactive platform teaching 30+ LLM optimization techniques for production AI apps. Learn agentic architecture, RAG systems, security, and performance patterns.">
  <meta name="keywords" content="LLM optimization, prompt engineering, AI development, agentic architecture, RAG systems, retrieval augmented generation, AI security, production AI, large language models, prompt patterns">
  <meta name="author" content="voku">
  <link rel="canonical" href="https://voku.github.io/PromptMastery/">
  
  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://voku.github.io/PromptMastery/">
  <meta property="og:site_name" content="PromptMastery">
  <meta property="og:title" content="PromptMastery - Master LLM Optimization & Prompt Engineering">
  <meta property="og:description" content="Interactive platform teaching 30+ LLM optimization techniques for production AI apps. Learn agentic architecture, RAG systems, security, and performance patterns.">
  <meta property="og:image" content="https://voku.github.io/PromptMastery/social-preview.svg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="PromptMastery - Interactive learning platform for LLM optimization techniques">
  
  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://voku.github.io/PromptMastery/">
  <meta name="twitter:title" content="PromptMastery - Master LLM Optimization & Prompt Engineering">
  <meta name="twitter:description" content="Interactive platform teaching 30+ LLM optimization techniques for production AI apps. Learn agentic architecture, RAG systems, security, and performance patterns.">
  <meta name="twitter:image" content="https://voku.github.io/PromptMastery/social-preview.svg">
  <meta name="twitter:image:alt" content="PromptMastery - Interactive learning platform for LLM optimization techniques">
</head>
```

## 3. SOCIAL_IMAGE_PLAN

**image_source**: existing (generated)

**path**: `social-preview.svg`

**absolute_url**: `https://voku.github.io/PromptMastery/social-preview.svg`

**reason**: Created a custom social preview image optimized for social media sharing (1200x630 aspect ratio). The design features:
- Clean, professional gradient background using project's brand colors (#0c4a6e to #0369a1)
- Project logo in top-left corner for brand recognition
- Clear title "PromptMastery" in large, readable font
- Descriptive subtitle "Master LLM Optimization Techniques"
- Three key bullet points highlighting main features
- Technology stack indicators at the bottom
- Decorative code pattern elements for visual interest without clutter

### Alternative: Generate a PNG version

If SVG format causes issues with some social media platforms, convert to PNG:

**SOCIAL_IMAGE_SPEC**: 
Modern, clean social media card (1200x630px) with a professional blue gradient background. Left side features subtle decorative code lines pattern. Right side displays the PromptMastery logo (blue circle with brackets and layered rectangles), followed by bold white "PromptMastery" title, light blue subtitle "Master LLM Optimization Techniques", and three bullet points with blue dot icons listing: "30+ Production-Ready Patterns", "Interactive Learning Platform", and "Agentic Architecture & RAG Systems". Bottom shows tech stack: "React • TypeScript • AI/ML • Prompt Engineering" in semi-transparent light blue.

**GENERATION_PROMPT**: 
```
Create a professional social media preview image (1200x630px) for a developer education platform called "PromptMastery". 

Style: Clean, modern, tech-focused design with a blue gradient background (from dark blue #0c4a6e to medium blue #0369a1). 

Layout:
- Left third: Subtle decorative pattern of horizontal code lines in semi-transparent white
- Top area: PromptMastery logo (a circular badge with blue background, white bracket symbols, and layered rectangles inside, with a small yellow accent dot)
- Center-right: Large bold white text "PromptMastery"
- Below title: Light blue subtitle "Master LLM Optimization Techniques"
- Middle section: Three bullet points with small blue circle icons, white text:
  * 30+ Production-Ready Patterns
  * Interactive Learning Platform
  * Agentic Architecture & RAG Systems
- Bottom: Tech stack tags in light blue semi-transparent text: "React • TypeScript • AI/ML • Prompt Engineering"

Typography: Modern sans-serif font (similar to Inter or system fonts). Title should be 72px, subtitle 32px, features 28px.

Color palette: Primary blue (#0ea5e9), dark blue (#0c4a6e), light blue (#e0f2fe), white, yellow accent (#fbbf24).

The design should look professional, readable, and optimized for social media sharing on Twitter/X, LinkedIn, and Facebook.
```

## 4. CHECKLIST

### Pre-deployment verification:
- [ ] **Build and test**: Run `npm run build` to ensure the social preview image is included in the production build
- [ ] **Image accessibility**: Verify that `social-preview.svg` is accessible at `https://voku.github.io/PromptMastery/social-preview.svg` after deployment
- [ ] **Convert to PNG if needed**: If social platforms don't render SVG properly, convert to PNG using a tool like ImageMagick or an online converter: `convert social-preview.svg -resize 1200x630 social-preview.png`
- [ ] **Update meta tags**: If converting to PNG, update all `og:image` and `twitter:image` URLs to reference `social-preview.png` instead of `.svg`

### Social media preview testing:
- [ ] **X (Twitter) Card Validator**: Test preview at https://cards-dev.twitter.com/validator - paste your URL and verify the card renders correctly
- [ ] **LinkedIn Post Inspector**: Share the URL in a LinkedIn post draft and check the preview renders properly
- [ ] **Facebook Sharing Debugger**: Test at https://developers.facebook.com/tools/debug/ to verify Open Graph tags
- [ ] **GitHub Repository Settings**: Upload `social-preview.svg` (or PNG version) as the repository's social preview image in Settings → General → Social preview

### Content verification:
- [ ] **Meta description length**: Verify description is under 160 characters for optimal display in search results
- [ ] **Title clarity**: Ensure the title clearly communicates the project's value proposition
- [ ] **Keywords relevance**: Confirm keywords match actual project content and target search terms
- [ ] **Image dimensions**: Verify social preview image is exactly 1200x630px for optimal social media display
- [ ] **Mobile preview**: Test how the page title and description appear on mobile devices

### Optional enhancements:
- [ ] **Structured data**: Consider adding JSON-LD structured data for enhanced search results
- [ ] **GitHub stars badge**: Add a dynamic GitHub stars badge to increase social proof
- [ ] **Analytics tracking**: Add UTM parameters to canonical URL in social shares to track traffic sources
- [ ] **Multiple OG images**: Create platform-specific images if different aspect ratios perform better on specific platforms

## Notes

The implementation follows best practices for social media meta tags:

1. **Canonical URL**: Uses the GitHub Pages deployment URL (`https://voku.github.io/PromptMastery/`) as the canonical URL since it's the live, publicly accessible version.

2. **Description optimization**: The meta description (149 characters) is concise, keyword-rich, and clearly communicates value without marketing fluff.

3. **Image format**: Created as SVG for scalability and small file size. Social platforms typically support SVG, but PNG fallback instructions are provided.

4. **Keywords strategy**: Selected 10 highly relevant keywords covering:
   - Core functionality: "LLM optimization", "prompt engineering"
   - Technical concepts: "agentic architecture", "RAG systems"
   - Target audience: "AI development", "production AI"
   - Specific features: "retrieval augmented generation", "AI security"

5. **Brand consistency**: Uses the existing project logo/icon design and color scheme (#0ea5e9 blue, matching the favicon.svg).

6. **Accessibility**: Includes `image:alt` attributes for screen readers and context when images don't load.

## Testing Commands

After deployment, test the implementation:

```bash
# Test meta tags are present
curl -s https://voku.github.io/PromptMastery/ | grep -i "og:image"
curl -s https://voku.github.io/PromptMastery/ | grep -i "twitter:card"

# Verify image is accessible
curl -I https://voku.github.io/PromptMastery/social-preview.svg
```

## Resources

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
