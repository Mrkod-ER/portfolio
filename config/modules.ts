export type ModuleType = 'about' | 'profile-stats' | 'projects' | 'goals'

export interface ModuleConfig {
  id: ModuleType
  enabled: boolean
  size: 'small' | 'medium' | 'large'
  gridPosition?: { row?: number; col?: number }
}

export const modulesConfig: ModuleConfig[] = [
  { id: 'about', enabled: true, size: 'large' },
  { id: 'profile-stats', enabled: true, size: 'large' },
  { id: 'projects', enabled: true, size: 'large' },
  { id: 'goals', enabled: true, size: 'medium' },
]

export const getEnabledModules = () => modulesConfig.filter(m => m.enabled)

