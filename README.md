# PromptMastery

A comprehensive collection of LLM optimization techniques for building production-ready AI applications. This interactive web app provides theory, examples, and best practices for prompt engineering, agentic architectures, and performance optimization.

## Features

- **30+ Optimization Techniques**: Covering Agentic Architecture, Retrieval Systems, Security, and Performance
- **Interactive Learning**: Each technique includes theory, code examples, and quizzes
- **Production-Ready Patterns**: Real-world examples with trade-offs and compatibility analysis
- **Progressive Learning**: Track your progress as you master each technique

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Clone the repository:
   ```bash
   git clone https://github.com/voku/PromptMastery.git
   cd PromptMastery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Deployment

This application is configured for GitHub Pages deployment. The GitHub Actions workflow automatically builds and deploys the app when changes are pushed to the main branch.

## Helper Prompts

### Key Files Detector

Use this prompt to quickly understand the structure of this codebase:

```
Analyze this codebase and identify the key files I should review first. For each file, provide:
1. The file path
2. Its primary responsibility
3. Why it's important to understand
4. Dependencies or files it interacts with

Focus on: 
- Application entry points
- Core component files
- Configuration files
- Type definitions

Present the results in a prioritized list, starting with the most critical files to understand the architecture.
```

## Project Structure

- `App.tsx` - Main application component with routing logic
- `constants.ts` - All optimization techniques and their content
- `components/` - React components for UI
- `types.ts` - TypeScript type definitions
- `hooks/` - Custom React hooks
- `vite.config.ts` - Vite build configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
