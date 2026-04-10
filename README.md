This is a [Next.js](https://nextjs.org) project for Märsta Bilhus, a car dealership website with vehicle lookup and car selling functionality.

## Features

- Vehicle information lookup using Swedish registration numbers
- Integration with Biluppgifter API for real-time vehicle data
- Car selling form with automatic vehicle data population
- Responsive design with modern UI components

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. (Optional) Biluppgifter API key for production use

### Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. If using Biluppgifter API in production, add your API key:
```
BILUPPGIFTER_API_KEY=your_api_key_here
```

### Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Endpoints

### Vehicle Lookup
- `GET /api/vehicle/[regno]` - Get vehicle information by registration number
- `POST /api/vehicle/[regno]` - Batch lookup for multiple registration numbers

The API integrates with [Biluppgifter](https://biluppgifter.se/) for real-time Swedish vehicle data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

git add . && git commit -m "Initial deployment to marstabilhus.se" && git push marstabilhus main