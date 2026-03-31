# AI Resume Analyzer Plus Job Matcher

AI Resume Analyzer Plus Job Matcher is a web application built with Next.js that allows users to upload their resumes and receive AI-powered analysis and job matching recommendations. The project leverages modern web technologies to provide a seamless and interactive user experience.

## Features

- Upload and analyze resumes using AI
- Receive personalized job recommendations based on resume content
- Clean, modern UI with responsive design
- Built with Next.js App Router and TypeScript
- Modular component structure for easy maintenance

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-resume-analyzer-job-matcher.git
   cd ai-resume-analyzer-job-matcher/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

- `src/app/` - Main application files (pages, layout, global styles)
- `src/components/` - Reusable UI components (Button, Navbar, HeroSection, UploadForm)
- `src/services/` - API service logic
- `public/` - Static assets

## Usage

1. Upload your resume using the upload form on the homepage.
2. The AI will analyze your resume and provide feedback.
3. View job matches tailored to your profile.

## Customization

- Modify UI components in `src/components/` to change the look and feel.
- Update API logic in `src/services/api.service.ts` to connect to your backend or AI service.

## Deployment

The app can be easily deployed to Vercel or any platform supporting Next.js.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

[MIT](LICENSE)
