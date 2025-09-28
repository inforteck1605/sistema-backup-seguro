// Tipos e utilitários para o sistema de backup
export interface BackupJob {
  id: string
  name: string
  source: string
  destination: string
  status: 'running' | 'completed' | 'failed' | 'paused'
  progress: number
  lastRun: string
  nextRun: string
  filesProcessed: number
  totalFiles: number
  speed: string
  encrypted: boolean
  compressionRatio?: number
  estimatedTimeRemaining?: string
}

export interface SystemStats {
  totalJobs: number
  activeJobs: number
  failedJobs: number
  totalDataBackedUp: string
  uptime: string
  serverStatus: 'online' | 'offline' | 'maintenance'
  networkSpeed: string
  diskUsage: number
  cpuUsage: number
  memoryUsage: number
  connectedClients: number
  networkThroughput: string
}

export interface NotificationConfig {
  email: {
    enabled: boolean
    smtp: string
    port: number
    username: string
    password: string
    to: string[]
  }
  whatsapp: {
    enabled: boolean
    apiKey: string
    phoneNumber: string
    instanceId: string
  }
  telegram: {
    enabled: boolean
    botToken: string
    chatId: string
  }
}

export interface SecurityConfig {
  encryptionEnabled: boolean
  encryptionAlgorithm: 'AES-256' | 'AES-192' | 'AES-128' | 'ChaCha20'
  keySize: 128 | 192 | 256
  passwordProtection: boolean
  twoFactorAuth: boolean
  sslEnabled: boolean
  certificatePath: string
  keyRotationDays: number
  backupIntegrity: boolean
}

export interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  category: 'Backup' | 'Sistema' | 'Rede' | 'Segurança' | 'Notificação'
  message: string
  details?: string
  jobId?: string
  jobName?: string
}

export interface BackupRule {
  id: string
  name: string
  source: string
  destination: string
  schedule: string
  enabled: boolean
  encrypted: boolean
  compression: boolean
  excludePatterns: string[]
}

export interface NotificationChannel {
  id: string
  type: 'email' | 'whatsapp' | 'telegram'
  name: string
  enabled: boolean
  config: any
}

// Utilitários
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'running': return 'bg-blue-500'
    case 'completed': return 'bg-green-500'
    case 'failed': return 'bg-red-500'
    case 'paused': return 'bg-yellow-500'
    default: return 'bg-gray-500'
  }
}

export const calculateETA = (progress: number, startTime: Date): string => {
  if (progress === 0) return 'Calculando...'
  
  const elapsed = Date.now() - startTime.getTime()
  const rate = progress / elapsed
  const remaining = (100 - progress) / rate
  
  return formatDuration(Math.floor(remaining / 1000))
}

// Simuladores para desenvolvimento
export const generateMockBackupJob = (): BackupJob => {
  const jobs = [
    'Documentos Corporativos',
    'Base de Dados MySQL',
    'Arquivos de Sistema',
    'Logs de Aplicação',
    'Backup Incremental',
    'Imagens Docker',
    'Configurações de Rede',
    'Backup de Email',
    'Arquivos de Usuário',
    'Backup de Configurações'
  ]
  
  const sources = [
    'C:\\Documentos\\',
    'D:\\Database\\',
    'C:\\System\\',
    '/var/log/',
    '/home/user/',
    '/opt/docker/',
    '/etc/network/',
    'C:\\Users\\',
    '/var/www/',
    '/etc/config/'
  ]
  
  const statuses: BackupJob['status'][] = ['running', 'completed', 'failed', 'paused']
  
  return {
    id: Date.now().toString(),
    name: jobs[Math.floor(Math.random() * jobs.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    destination: 'Server\\Backup\\' + Math.random().toString(36).substring(7),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    progress: Math.floor(Math.random() * 100),
    lastRun: new Date(Date.now() - Math.random() * 86400000).toLocaleString('pt-BR'),
    nextRun: new Date(Date.now() + Math.random() * 86400000).toLocaleString('pt-BR'),
    filesProcessed: Math.floor(Math.random() * 1000),
    totalFiles: Math.floor(Math.random() * 2000) + 1000,
    speed: (Math.random() * 100).toFixed(1) + ' MB/s',
    encrypted: Math.random() > 0.3,
    compressionRatio: Math.random() * 0.5 + 0.3,
    estimatedTimeRemaining: Math.floor(Math.random() * 3600) + 's'
  }
}

export const generateMockLogEntry = (): LogEntry => {
  const levels: LogEntry['level'][] = ['info', 'warning', 'error', 'success']
  const categories: LogEntry['category'][] = ['Backup', 'Sistema', 'Rede', 'Segurança', 'Notificação']
  const messages = [
    'Backup iniciado com sucesso',
    'Falha na conexão com servidor',
    'Arquivo criptografado',
    'Espaço em disco baixo',
    'Notificação enviada',
    'Chave de segurança renovada',
    'Processo concluído',
    'Erro de permissão',
    'Backup incremental finalizado',
    'Conexão SSL estabelecida',
    'Verificação de integridade OK',
    'Compressão aplicada com sucesso'
  ]
  
  return {
    id: Date.now().toString(),
    timestamp: new Date().toLocaleString('pt-BR'),
    level: levels[Math.floor(Math.random() * levels.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    details: Math.random() > 0.5 ? 'Detalhes adicionais sobre o evento registrado no sistema.' : undefined
  }
}

// Constantes
export const ENCRYPTION_ALGORITHMS = [
  { value: 'AES-256', label: 'AES-256 (Recomendado)' },
  { value: 'AES-192', label: 'AES-192' },
  { value: 'AES-128', label: 'AES-128' },
  { value: 'ChaCha20', label: 'ChaCha20' }
] as const

export const BACKUP_SCHEDULES = [
  { value: 'hourly', label: 'A cada hora' },
  { value: 'daily', label: 'Diário' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' }
] as const

export const NOTIFICATION_TYPES = [
  { value: 'email', label: 'Email', icon: 'Mail' },
  { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
  { value: 'telegram', label: 'Telegram', icon: 'Send' }
] as const

// Configurações padrão do sistema
export const DEFAULT_BACKUP_CONFIG = {
  maxConcurrentJobs: 3,
  retryAttempts: 3,
  timeout: 300,
  compressionLevel: 6,
  encryptionEnabled: true,
  backupRetention: 30 // dias
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  encryptionEnabled: true,
  encryptionAlgorithm: 'AES-256',
  keySize: 256,
  passwordProtection: true,
  twoFactorAuth: false,
  sslEnabled: true,
  certificatePath: '/certs/backup.crt',
  keyRotationDays: 90,
  backupIntegrity: true
}

// Validadores
export const validateBackupRule = (rule: Partial<BackupRule>): string[] => {
  const errors: string[] = []
  
  if (!rule.name?.trim()) {
    errors.push('Nome da regra é obrigatório')
  }
  
  if (!rule.source?.trim()) {
    errors.push('Pasta de origem é obrigatória')
  }
  
  if (!rule.destination?.trim()) {
    errors.push('Pasta de destino é obrigatória')
  }
  
  if (!rule.schedule) {
    errors.push('Agendamento é obrigatório')
  }
  
  return errors
}

export const validateNotificationConfig = (config: Partial<NotificationChannel>): string[] => {
  const errors: string[] = []
  
  if (!config.name?.trim()) {
    errors.push('Nome do canal é obrigatório')
  }
  
  if (config.type === 'email') {
    if (!config.config?.smtp) errors.push('Servidor SMTP é obrigatório')
    if (!config.config?.username) errors.push('Usuário é obrigatório')
    if (!config.config?.to) errors.push('Email de destino é obrigatório')
  }
  
  if (config.type === 'whatsapp') {
    if (!config.config?.apiKey) errors.push('API Key é obrigatória')
    if (!config.config?.phoneNumber) errors.push('Número de telefone é obrigatório')
  }
  
  if (config.type === 'telegram') {
    if (!config.config?.botToken) errors.push('Bot Token é obrigatório')
    if (!config.config?.chatId) errors.push('Chat ID é obrigatório')
  }
  
  return errors
}