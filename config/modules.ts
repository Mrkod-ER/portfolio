export type ModuleType = 'about' | 'goals' | 'codeforces' | 'leetcode' | 'codechef' | 'geeksforgeeks' | 'projects'

export interface ModuleConfig {
  id: ModuleType
  enabled: boolean
  size: 'small' | 'medium' | 'large'
  gridPosition?: { row?: number; col?: number }
}

export const modulesConfig: ModuleConfig[] = [
  { id: 'about', enabled: true, size: 'large' },
  { id: 'goals', enabled: true, size: 'medium' },
  { id: 'codeforces', enabled: true, size: 'medium' },
  { id: 'leetcode', enabled: true, size: 'medium' },
  { id: 'codechef', enabled: true, size: 'small' },
  { id: 'geeksforgeeks', enabled: true, size: 'small' },
  { id: 'projects', enabled: true, size: 'large' },
]

export const getEnabledModules = () => modulesConfig.filter(m => m.enabled)
