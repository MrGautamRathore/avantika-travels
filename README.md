# Avantika Travels - Frontend

A modern travel website built with Next.js, featuring package bookings, destination guides, and blog content.

## Tech Stack

- **Framework**: Next.js 16.1.0
- **Frontend**: React 19.2.3
- **Styling**: Tailwind CSS 4.1.18
- **Animations**: Framer Motion 12.23.26
- **Icons**: React Icons 5.5.0, Lucide React 0.562.0
- **HTTP Client**: Axios 1.13.2

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API server running (see backend README)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd avantika
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and configure:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., `http://localhost:5000/api`)
   - `NEXT_PUBLIC_BASE_URL`: Your frontend base URL (e.g., `https://avantikatravels.com`)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
avantika/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── api/            # API routes
│   │   ├── blogs/          # Blog pages
│   │   ├── booking/        # Booking system
│   │   ├── packages/       # Travel packages
│   │   └── places/         # Destination pages
│   ├── components/         # Reusable components
│   │   ├── home/           # Homepage sections
│   │   ├── layout/         # Layout components
│   │   ├── seo/            # SEO components
│   │   └── ui/             # UI components
│   └── context/            # React contexts
├── public/                 # Static assets
└── package.json
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Server-side rendering and meta tags
- **Admin Dashboard**: Content management system
- **Booking System**: Travel package reservations
- **Blog System**: Travel guides and articles
- **Dynamic Sitemap**: Auto-generated XML sitemap
- **Contact Forms**: Integrated contact management

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_BASE_URL` | Frontend base URL | `https://avantikatravels.com` |

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For support or questions, please contact the development team.
