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
}

export const codeforces: CodeProfile = {
  name: 'Codeforces',
  rating: 1850,
  maxRating: 1850,
  rank: 'Candidate Master',
  contestsCount: 45,
  problemsSolved: 892,
  link: 'https://codeforces.com',
  color: '#FF6500'
}

export const leetcode: CodeProfile = {
  name: 'LeetCode',
  rating: 2180,
  maxRating: 2180,
  rank: 'Knight',
  contestsCount: 52,
  problemsSolved: 487,
  link: 'https://leetcode.com',
  color: '#FFA500'
}

export const codechef: CodeProfile = {
  name: 'CodeChef',
  rating: 1950,
  maxRating: 1950,
  rank: '5★',
  contestsCount: 38,
  problemsSolved: 625,
  link: 'https://codechef.com',
  color: '#8B4513'
}

export const geeksforgeeks: CodeProfile = {
  name: 'GeeksforGeeks',
  rating: 2100,
  maxRating: 2100,
  rank: 'Top Contributor',
  contestsCount: 0,
  problemsSolved: 1200,
  link: 'https://geeksforgeeks.org',
  color: '#2DBE60'
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'AI Chat Platform',
    description: 'Real-time chat application with AI-powered responses and message history.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'OpenAI'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    category: 'web',
    featured: true,
  },
  {
    id: '2',
    name: 'Data Visualization Dashboard',
    description: 'Interactive dashboard with real-time charts and analytics for business metrics.',
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    category: 'web',
    featured: true,
  },
  {
    id: '3',
    name: 'Mobile Weather App',
    description: 'Cross-platform weather application with location tracking and forecasts.',
    techStack: ['React Native', 'Expo', 'Weather API', 'Redux'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    category: 'mobile',
    featured: false,
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
  name: 'Alex Developer',
  role: 'Full Stack Developer',
  bio: 'Building scalable web applications and solving complex problems with code. Passionate about clean architecture and modern web technologies.',
  location: 'San Francisco, CA',
  email: 'alex@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'AWS'],
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
