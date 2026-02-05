# Modular Developer Portfolio

A fully scalable, modular developer portfolio built with Next.js, Tailwind CSS, and shadcn/ui. Designed with a beautiful bento grid layout that feels like a photo gallery of components.

## Architecture Overview

This portfolio uses a **plug-and-play module system** that makes it easy to add, remove, or customize sections without redesigning the entire layout.

### Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── layout.tsx            # Root layout with theme support
│   └── globals.css           # Global styles and theme tokens
├── components/
│   ├── BentoGrid.tsx         # Responsive grid layout
│   ├── ModuleCard.tsx        # Reusable card component with expand/collapse
│   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   └── modules/              # Individual portfolio modules
│       ├── AboutModule.tsx
│       ├── GoalsModule.tsx
│       ├── CodingProfileModule.tsx
│       └── ProjectsModule.tsx
├── config/
│   └── modules.ts            # Module enable/disable configuration
├── data/
│   └── profiles.ts           # Mock data (easily replace with API)
└── lib/
    └── utils.ts              # Utility functions
```

## Key Features

### 1. Modular Configuration System

Enable or disable modules via `/config/modules.ts`:

```typescript
export const modulesConfig: ModuleConfig[] = [
  { id: 'about', enabled: true, size: 'large' },
  { id: 'goals', enabled: true, size: 'medium' },
  { id: 'codeforces', enabled: true, size: 'medium' },
  // Add or remove modules here
]
```

### 2. Bento Grid Layout

The grid automatically adapts to different screen sizes:
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 4-column grid with variable card sizes

Cards support three sizes:
- `small` - Single cell (good for quick stats)
- `medium` - 2-cell width (default for most content)
- `large` - 2x2 grid (perfect for featured content)

### 3. Expand/Collapse Animation

Each card can expand to a modal view with a smooth animation:
- Click the chevron icon to expand
- Cards expand to fill the screen with a dark overlay
- Click outside to collapse back to grid
- Supports scrollable content inside expanded view

### 4. Theme Toggle

Built-in dark/light mode toggle with:
- Smooth transitions between themes
- localStorage persistence
- System preference detection on first load

## Customization Guide

### Adding a New Module

1. **Create module component** in `/components/modules/`:

```typescript
// components/modules/MyNewModule.tsx
import { ModuleCard } from '@/components/ModuleCard'

export function MyNewModule() {
  return (
    <ModuleCard
      id="my-module"
      title="My Module"
      size="medium"
      icon="📌"
    >
      <div>Your content here</div>
    </ModuleCard>
  )
}
```

2. **Add to config** in `/config/modules.ts`:

```typescript
export const modulesConfig: ModuleConfig[] = [
  // ... existing modules
  { id: 'my-module', enabled: true, size: 'medium' },
]
```

3. **Register in page.tsx**:

```typescript
const moduleComponents: Record<string, React.ReactNode> = {
  // ... existing modules
  'my-module': <MyNewModule key="my-module" />,
}
```

### Connecting to Real Data

Replace mock data in `/data/profiles.ts` with API calls:

```typescript
// Example: Fetch from external API
export async function getProjectsData() {
  const response = await fetch('https://api.example.com/projects')
  return response.json()
}
```

### Styling and Colors

The portfolio uses shadcn/ui design tokens defined in `app/globals.css`. To customize colors:

1. Edit CSS variables in `/app/globals.css`:
```css
:root {
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* ... other tokens */
}
```

2. Use semantic classes in components:
```tsx
<div className="bg-card text-card-foreground border border-border">
  Content
</div>
```

## Expandable Module Ideas

The system is built to support future modules:

- **Blog** - Featured articles and posts
- **Resume** - Downloadable CV and work history
- **Certifications** - Badges and credentials
- **Achievements** - Awards and milestones
- **Activity Graph** - Contribution history
- **Timeline** - Career progression
- **GitHub Stats** - Repository analytics
- **Custom Sections** - Anything you want!

## Development Tips

### Testing Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Performance

- All components are optimized for server-side rendering
- Smooth animations use CSS transitions (GPU accelerated)
- Cards use lazy loading where applicable
- Images should be optimized with Next.js Image component

### Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation fully supported
- Theme toggle respects `prefers-color-scheme`
- Screen reader friendly with semantic HTML

## Configuration Reference

### ModuleConfig Interface

```typescript
interface ModuleConfig {
  id: ModuleType
  enabled: boolean
  size: 'small' | 'medium' | 'large'
  gridPosition?: { row?: number; col?: number }
}
```

### Module Types

```typescript
type ModuleType = 
  | 'about' 
  | 'goals' 
  | 'codeforces' 
  | 'leetcode' 
  | 'codechef' 
  | 'geeksforgeeks' 
  | 'projects'
```

## Deployment

Deploy to Vercel with one click:

1. Push to GitHub
2. Connect repository to Vercel
3. Environment variables auto-configured
4. Live in seconds!

## License

Feel free to use this portfolio template for your own projects.
