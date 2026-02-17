export interface CodeProfile {
  name: string
  rating: number
  maxRating: number
  rank: string
  contestsCount: number
  problemsSolved: number
  link: string
  color: string
}

export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  github?: string
  liveDemo?: string
  category: 'web' | 'mobile' | 'ml' | 'tools'
  featured: boolean
  npm?: string
  version?: string
  license?: string
}

export const codeforces: CodeProfile = {
  name: 'Codeforces',
  rating: 0,
  maxRating: 0,
  rank: 'N/A',
  contestsCount: 0,
  problemsSolved: 0,
  link: 'https://codeforces.com/profile/koderabhishek',
  color: '#FF6500'
}

export const leetcode: CodeProfile = {
  name: 'LeetCode',
  rating: 0,
  maxRating: 0,
  rank: 'N/A',
  contestsCount: 0,
  problemsSolved: 0,
  link: 'https://leetcode.com/Mrkod-ER',
  color: '#FFA500'
}

export const codechef: CodeProfile = {
  name: 'CodeChef',
  rating: 0,
  maxRating: 0,
  rank: 'N/A',
  contestsCount: 0,
  problemsSolved: 0,
  link: 'https://www.codechef.com/users/king_koder',
  color: '#8B4513'
}

export const geeksforgeeks: CodeProfile = {
  name: 'GeeksforGeeks',
  rating: 0,
  maxRating: 0,
  rank: 'N/A',
  contestsCount: 0,
  problemsSolved: 0,
  link: 'https://www.geeksforgeeks.org/user/koderabhishek/',
  color: '#2DBE60'
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Competitive-Programming-Stats Extractor Module',
    description: 'A unified TypeScript SDK to fetch competitive programming stats from Codeforces, LeetCode, CodeChef, and GeeksforGeeks. Features parallel requests, error safety, and a CLI tool for terminal usage.',
    techStack: ['TypeScript', 'Node.js', 'Next.js', 'React'],
    github: 'https://github.com/mrkod-er/profile-stats',
    liveDemo: 'https://profile-stats-docs.vercel.app',
    category: 'web',
    featured: true,
    npm: 'https://www.npmjs.com/package/profile-stats',
    version: '0.2.1',
    license: 'MIT',
  },
  {
  id: '2', // You can change this ID
  name: 'Chat Onn - Real-time Communication Platform',
  description: 'A full-featured Application for instant messaging, HD video calls, and group collaboration. Built with modern real-time infrastructure, secure authentication, and a premium responsive design.',
  techStack: [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Convex DB',
    'Clerk Auth',
    'Stream Video & Chat SDK', // Handles the video calling/messaging
    'Shadcn UI'
  ],
  github: 'https://github.com/Mrkod-ER/Chat-Onn', // Replace with your actual repo
  liveDemo: 'https://chat-onn.vercel.app/', // Replace with your actual deployed URL
  category: 'web',
  featured: true,
  },
  {
    id: '3',
    name: 'Chat App',
    description: 'A real-time chat application built with Next.js, Convex, Clerk, and WebSockets—offering fast, secure, and modern messaging.',
    techStack: ['Next.js', 'Convex', 'Clerk', 'React', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Mrkod-ER/chat-app',
    liveDemo: 'https://chat-app-brown-one.vercel.app/',
    category: 'web',
    featured: true,
},
  {
    id: '4',
    name: 'ML Image Classifier',
    description: 'Deep learning model for image classification with 95% accuracy.',
    techStack: ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    category: 'ml',
    featured: false,
  },
  {
    id: '5',
    name: 'CLI Developer Tool',
    description: 'Command-line tool for project scaffolding and automation.',
    techStack: ['Node.js', 'Commander', 'Shell', 'NPM'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    category: 'tools',
    featured: false,
  },
  {
    id: '6',
    name: 'Social Network API',
    description: 'RESTful API for social networking with authentication and real-time features.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    category: 'web',
    featured: false,
  },
]

export const aboutMe = {
  name: 'Abhishek Singh',
  role: 'Full Stack Developer',
  bio: 'Building scalable web applications and solving complex problems with code. Passionate about clean architecture and modern web technologies.',
  location: 'Bareilly, UttarPradesh',
  email: 'abhisheksinghdev5@gmail.com',
  github: 'https://github.com/Mrkod-ER',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com/_int_max',
  skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'MongoDB', 'Python', 'C++', 'Java', 'Docker', 'FastApi', 'Express'],
}

export const goals = {
  title: 'Goals & Vision',
  items: [
    {
      icon: '🚀',
      title: 'Build Scalable Systems',
      description: 'Design and develop high-performance systems that handle millions of users.',
    },
    {
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Stay updated with cutting-edge technologies and best practices in web development.',
    },
    {
      icon: '🤝',
      title: 'Open Source Contribution',
      description: 'Contribute to meaningful open-source projects and help the developer community.',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Create innovative solutions that solve real-world problems and improve user experiences.',
    },
  ],
}
