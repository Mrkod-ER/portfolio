# 🚀 Developer Portfolio

A modern, responsive portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Created with [v0 by Vercel](https://v0.dev).

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## ✨ Features

- **Bento Grid Layout** - Modern card-based design with interactive modules
- **Competitive Programming Stats** - Showcase Codeforces, LeetCode, CodeChef, and GFG profiles
- **Project Showcase** - Highlight your best work with live demos and GitHub links
- **Goals & Vision** - Share your professional aspirations
- **Like Button System** - Interactive engagement features
- **Dark/Light Mode** - Seamless theme switching with `next-themes`
- **Fully Responsive** - Looks great on all devices
- **Fast & SEO Optimized** - Built with Next.js Turbopack

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, CSS Variables |
| UI Components | Radix UI, shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Animations | Tailwind Animate |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   └── goals/             # Goals page
├── components/
│   ├── modules/           # Bento grid modules
│   │   ├── AboutModule.tsx
│   │   ├── ProjectsModule.tsx
│   │   └── ...
│   └── ui/                # Reusable UI components
├── data/
│   └── profiles.ts        # Your profile data
├── styles/
│   └── globals.css        # Global styles
└── public/                # Static assets
```

## ⚙️ Configuration

Edit the `data/profiles.ts` file to customize your portfolio:

```typescript
export const aboutMe = {
  name: 'Your Name',
  role: 'Your Role',
  bio: 'Your bio...',
  location: 'Your Location',
  email: 'your@email.com',
  github: 'https://github.com/yourusername',
  // ... more fields
}
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using [Next.js](https://nextjs.org) and [v0](https://v0.dev)
