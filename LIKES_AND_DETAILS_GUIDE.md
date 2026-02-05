# Likes & Detail Pages Guide

## Overview

Your portfolio now includes interactive like functionality and detailed view pages for all major modules. Each component displays a like button showing the number of people who've liked that section.

## Features

### 1. Like System

#### How It Works
- **Like Button**: Located in the header of each module card
- **Like Counter**: Shows the current number of likes with a heart icon
- **Interactive Feedback**: Heart fills with red and bounces when liked
- **Persistent Storage**: Likes are stored in browser's localStorage
- **Toggle Action**: Click to like/unlike - your vote is counted automatically

#### Like Button UI
```
[❤️ 42] ← Click to like/unlike
```

#### Features
- Visual feedback (red heart when liked)
- Smooth animations and hover effects
- Shows total count of people who liked
- Initial random count (10-510) generated on first visit
- User preference saved locally

### 2. Detail Pages

#### Pages Added

1. **About Me** (`/about`)
   - Full profile information
   - Complete skills and expertise list
   - Contact links (Email, GitHub, LinkedIn, Twitter)
   - Career highlights and achievements
   - Like button with counter

2. **Projects** (`/project/[id]`)
   - Detailed project information
   - Full technology stack
   - Category and featured status
   - Links to GitHub repository and live demo
   - Additional project description
   - Like button specific to each project

3. **Coding Profiles** (`/coding-profile/[platform]`)
   - Supported platforms:
     - `/coding-profile/codeforces`
     - `/coding-profile/leetcode`
     - `/coding-profile/codechef`
     - `/coding-profile/geeksforgeeks`
   - Rating and progress visualization
   - Contest participation stats
   - Problems solved count
   - Rank and achievements
   - Performance summary
   - Like button for each platform profile

4. **Goals & Vision** (`/goals`)
   - All goals displayed with icons
   - Detailed descriptions
   - Long-term vision statement
   - Milestone timeline with year markers
   - Like button with counter

### 3. Navigation

#### From Main Portfolio
- **Click any module card** → Opens detail page
- **Like button** → Increases/decreases like count
- **View Details link** → Navigate to full page (appears on hover/expand)
- **Expand/collapse** → Opens expanded modal view

#### From Detail Page
- **Back button** → Returns to main portfolio
- **External links** → GitHub, LinkedIn, Twitter, Email (open in new tab)
- **Like button** → Vote for this section

## Implementation Details

### Like Storage

Likes are stored in two localStorage keys:
- `likes-[id]`: Stores the current like count
- `liked-[id]`: Stores user's like status (true/false)

### Component IDs for Likes

```javascript
// Modules
"about"           // About Me card
"goals"           // Goals & Vision card
"codeforces"      // Codeforces profile
"leetcode"        // LeetCode profile
"codechef"        // CodeChef profile
"geeksforgeeks"   // GeeksforGeeks profile
"projects"        // Projects card

// Individual Projects (in detail page)
"project-1"       // First project
"project-2"       // Second project
// etc...

// Coding Profiles (in detail page)
"coding-codeforces"
"coding-leetcode"
"coding-codechef"
"coding-geeksforgeeks"
```

## Usage Examples

### Adding a Like Button to New Components

```tsx
import { LikeButton } from '@/components/LikeButton'

export function MyComponent() {
  return (
    <div>
      <LikeButton id="my-component-id" />
    </div>
  )
}
```

### Working with Likes Programmatically

```tsx
import { getLikes, toggleUserLike, hasUserLiked } from '@/lib/likes'

// Get current likes
const count = getLikes('my-id')

// Check if user has liked
const userLiked = hasUserLiked('my-id')

// Toggle like status
const newStatus = toggleUserLike('my-id') // true = liked, false = unliked
```

## File Structure

```
app/
├── about/
│   └── page.tsx              # About Me detail page
├── coding-profile/
│   └── [platform]/
│       └── page.tsx          # Coding profile detail page
├── goals/
│   └── page.tsx              # Goals & Vision detail page
├── project/
│   └── [id]/
│       └── page.tsx          # Project detail page
└── page.tsx                  # Main portfolio (updated with links)

components/
├── LikeButton.tsx            # Like button component
├── ModuleCard.tsx            # Updated with like button
└── modules/
    ├── AboutModule.tsx       # Updated with link to /about
    ├── GoalsModule.tsx       # Updated with link to /goals
    ├── CodingProfileModule.tsx  # Updated with links
    └── ProjectsModule.tsx    # Updated with project links

lib/
└── likes.ts                  # Like utilities and localStorage management
```

## Customization

### Change Initial Like Range

Edit `/lib/likes.ts`:
```tsx
export function generateRandomLikes(): number {
  return Math.floor(Math.random() * 500) + 10; // Change 500 and 10
}
```

### Styling Like Button

The LikeButton uses Tailwind classes. Modify in `/components/LikeButton.tsx`:
```tsx
<Heart
  className={cn(
    'transition-all duration-200',
    isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground',
    // Add custom classes here
  )}
/>
```

### Clear All Likes

Run in browser console:
```javascript
// Clear all likes
Object.keys(localStorage)
  .filter(key => key.startsWith('likes-') || key.startsWith('liked-'))
  .forEach(key => localStorage.removeItem(key))
```

## Performance Notes

- Like counts are generated randomly on first visit
- Subsequent visits restore the saved count
- localStorage has ~5-10MB limit per origin
- Each like entry uses ~20-30 bytes
- Performance impact is negligible

## Future Enhancements

1. **Backend Integration**: Replace localStorage with API calls
2. **Real Likes**: Connect to a database for real user likes
3. **Analytics**: Track which projects are most liked
4. **Notifications**: Show when someone likes your section
5. **Sharing**: Share your portfolio with like counts preserved
6. **Social**: OAuth integration for authenticated likes

## Troubleshooting

### Likes Not Persisting
- Check browser's localStorage is enabled
- Clear cache and reload
- Check browser console for errors

### Like Button Not Showing
- Ensure LikeButton component is imported
- Check unique ID is provided
- Verify component is client-side (`'use client'`)

### Links Not Working
- Check route paths match the page filenames
- Verify project IDs match the data
- Check Next.js version compatibility

## File Locations

- Likes utility: `/lib/likes.ts`
- LikeButton component: `/components/LikeButton.tsx`
- Detail pages: `/app/*/page.tsx`
- Modified modules: `/components/modules/*.tsx`
