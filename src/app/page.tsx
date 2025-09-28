"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Server, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  HardDrive,
  Wifi,
  Settings,
  Bell,
  Play,
  Pause,
  RotateCcw,
  Database,
  Lock,
  Mail,
  MessageCircle,
  Send,
  Download,
  Upload,
  Zap,
  Users,
  Globe
} from 'lucide-react'
import BackupConfig from '@/components/backup/BackupConfig'
import NotificationSettings from '@/components/backup/NotificationSettings'
import BackupLogs from '@/components/backup/BackupLogs'
import SecuritySettings from '@/components/backup/SecuritySettings'
import SystemMonitor from '@/components/backup/SystemMonitor'
import DeploymentGuide from '@/components/backup/DeploymentGuide'

interface BackupJob {
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

interface SystemStats {
  totalJobs: number
  activeJobs: number
  failedJobs: number
  totalDataBackedUp: string
  uptime: string
  serverStatus: 'online' | 'offline' | 'maintenance'
  connectedClients: number
  networkThroughput: string
}

export default function BackupDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([
    {
      id: '1',
      name: 'Documentos Corporativos',
      source: 'C:\\Documentos\\',
      destination: 'Server\\Backup\\Docs\\',
      status: 'running',
      progress: 67,
      lastRun: '2024-01-15 14:30',
      nextRun: '2024-01-15 18:00',
      filesProcessed: 1247,
      totalFiles: 1856,
      speed: '45.2 MB/s',
      encrypted: true,
      compressionRatio: 0.65,
      estimatedTimeRemaining: '12m 34s'
    },
    {
      id: '2',
      name: 'Base de Dados MySQL',
      source: 'D:\\Database\\',
      destination: 'Server\\Backup\\DB\\',
      status: 'completed',
      progress: 100,
      lastRun: '2024-01-15 12:00',
      nextRun: '2024-01-16 12:00',
      filesProcessed: 523,
      totalFiles: 523,
      speed: '0 MB/s',
      encrypted: true,
      compressionRatio: 0.45,
      estimatedTimeRemaining: 'Concluído'
    },
    {
      id: '3',
      name: 'Arquivos de Sistema',
      source: 'C:\\System\\',
      destination: 'Server\\Backup\\System\\',
      status: 'failed',
      progress: 23,
      lastRun: '2024-01-15 10:15',
      nextRun: '2024-01-15 16:00',
      filesProcessed: 89,
      totalFiles: 387,
      speed: '0 MB/s',
      encrypted: false,
      estimatedTimeRemaining: 'Falhou'
    },
    {
      id: '4',
      name: 'Logs de Aplicação',
      source: '/var/log/',
      destination: 'Server\\Backup\\Logs\\',
      status: 'paused',
      progress: 78,
      lastRun: '2024-01-15 13:45',
      nextRun: '2024-01-15 17:00',
      filesProcessed: 234,
      totalFiles: 300,
      speed: '0 MB/s',
      encrypted: true,
      compressionRatio: 0.82,
      estimatedTimeRemaining: 'Pausado'
    }
  ])

  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalJobs: 15,
    activeJobs: 1,
    failedJobs: 1,
    totalDataBackedUp: '2.4 TB',
    uptime: '15 dias, 7h 23m',
    serverStatus: 'online',
    connectedClients: 8,
    networkThroughput: '125.3 MB/s'
  })

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'error',
      message: 'Falha no backup "Arquivos de Sistema" - Acesso negado ao diretório',
      timestamp: '14:45',
      read: false
    },
    {
      id: '2',
      type: 'success',
      message: 'Backup "Base de Dados MySQL" concluído com sucesso',
      timestamp: '12:05',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      message: 'Espaço em disco baixo no servidor de backup (15% restante)',
      timestamp: '11:30',
      read: true
    },
    {
      id: '4',
      type: 'info',
      message: 'Novo cliente conectado: Workstation-05',
      timestamp: '10:15',
      read: true
    }
  ])

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setBackupJobs(prev => prev.map(job => {
        if (job.status === 'running' && job.progress < 100) {
          const newProgress = Math.min(job.progress + Math.random() * 3, 100)
          const newFilesProcessed = Math.min(job.filesProcessed + Math.floor(Math.random() * 10), job.totalFiles)
          
          return {
            ...job,
            progress: newProgress,
            filesProcessed: newFilesProcessed,
            estimatedTimeRemaining: newProgress >= 100 ? 'Concluído' : `${Math.floor(Math.random() * 30)}m ${Math.floor(Math.random() * 60)}s`
          }
        }
        return job
      }))

      // Atualizar estatísticas do sistema
      setSystemStats(prev => ({
        ...prev,
        networkThroughput: `${(Math.random() * 50 + 100).toFixed(1)} MB/s`,
        connectedClients: Math.max(1, prev.connectedClients + Math.floor((Math.random() - 0.5) * 2))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      case 'paused': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <AlertTriangle className="w-4 h-4" />
      case 'paused': return <Pause className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleJobAction = (jobId: string, action: 'start' | 'pause' | 'retry') => {
    setBackupJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        switch (action) {
          case 'start':
            return { ...job, status: 'running' as const }
          case 'pause':
            return { ...job, status: 'paused' as const }
          case 'retry':
            return { ...job, status: 'running' as const, progress: 0, filesProcessed: 0 }
          default:
            return job
        }
      }
      return job
    }))
  }

  const startAllJobs = () => {
    setBackupJobs(prev => prev.map(job => 
      job.status === 'paused' || job.status === 'failed' 
        ? { ...job, status: 'running' as const } 
        : job
    ))
  }

  const pauseAllJobs = () => {
    setBackupJobs(prev => prev.map(job => 
      job.status === 'running' 
        ? { ...job, status: 'paused' as const } 
        : job
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Sistema de Backup Avançado
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Backup seguro com criptografia AES-256 e monitoramento em tempo real
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Badge variant={systemStats.serverStatus === 'online' ? 'default' : 'destructive'} className="flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              {systemStats.serverStatus === 'online' ? 'Servidor Online' : 'Servidor Offline'}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {systemStats.connectedClients} Clientes
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              {notifications.filter(n => !n.read).length} Notificações
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total de Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{systemStats.totalJobs}</span>
                <Database className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Jobs Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{systemStats.activeJobs}</span>
                <Activity className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Falhas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{systemStats.failedJobs}</span>
                <AlertTriangle className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Dados Salvos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{systemStats.totalDataBackedUp}</span>
                <HardDrive className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Throughput</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{systemStats.networkThroughput}</span>
                <Zap className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="monitor">Monitor</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="deploy">Executável</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Notificações Recentes */}
            {notifications.filter(n => !n.read).length > 0 && (
              <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  Você tem {notifications.filter(n => !n.read).length} notificações não lidas. 
                  Verifique a aba "Notificações" para mais detalhes.
                </AlertDescription>
              </Alert>
            )}

            {/* Controles Globais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Controles Globais
                </CardTitle>
                <CardDescription>
                  Gerencie todos os jobs de backup simultaneamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button onClick={startAllJobs} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Todos
                  </Button>
                  <Button onClick={pauseAllJobs} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar Todos
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Relatório Completo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Jobs de Backup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Jobs de Backup Ativos
                </CardTitle>
                <CardDescription>
                  Monitoramento em tempo real dos processos de backup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {backupJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getStatusColor(job.status)} text-white flex items-center gap-1`}>
                              {getStatusIcon(job.status)}
                              {job.status.toUpperCase()}
                            </Badge>
                            <h3 className="font-semibold text-lg">{job.name}</h3>
                            {job.encrypted && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                AES-256
                              </Badge>
                            )}
                            {job.compressionRatio && (
                              <Badge variant="outline" className="text-xs">
                                Compressão: {(job.compressionRatio * 100).toFixed(0)}%
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <p><strong>Origem:</strong> {job.source}</p>
                            <p><strong>Destino:</strong> {job.destination}</p>
                            <div className="flex flex-wrap gap-4 mt-2">
                              <span>Último backup: {job.lastRun}</span>
                              <span>Próximo: {job.nextRun}</span>
                              <span>Velocidade: {job.speed}</span>
                              <span>ETA: {job.estimatedTimeRemaining}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {job.status === 'running' && (
                            <Button size="sm" variant="outline" onClick={() => handleJobAction(job.id, 'pause')}>
                              <Pause className="w-4 h-4" />
                            </Button>
                          )}
                          {job.status === 'paused' && (
                            <Button size="sm" variant="outline" onClick={() => handleJobAction(job.id, 'start')}>
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          {job.status === 'failed' && (
                            <Button size="sm" variant="outline" onClick={() => handleJobAction(job.id, 'retry')}>
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso: {job.filesProcessed} / {job.totalFiles} arquivos</span>
                          <span>{job.progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={job.progress} className="h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status do Sistema */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Status do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Uptime do Servidor</span>
                      <span className="text-sm text-green-600 font-semibold">{systemStats.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Status da Conexão</span>
                      <Badge variant={systemStats.serverStatus === 'online' ? 'default' : 'destructive'}>
                        {systemStats.serverStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Clientes Conectados</span>
                      <Badge variant="outline">{systemStats.connectedClients}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Criptografia Ativa</span>
                      <Badge variant="default" className="bg-green-500">
                        <Shield className="w-3 h-3 mr-1" />
                        AES-256
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Notificações</span>
                      <div className="flex gap-1">
                        <Badge variant="outline"><Mail className="w-3 h-3" /></Badge>
                        <Badge variant="outline"><MessageCircle className="w-3 h-3" /></Badge>
                        <Badge variant="outline"><Send className="w-3 h-3" /></Badge>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Throughput de Rede</span>
                      <Badge variant="outline" className="text-blue-600">
                        <Globe className="w-3 h-3 mr-1" />
                        {systemStats.networkThroughput}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Monitor do Sistema
                </CardTitle>
                <CardDescription>
                  Monitoramento em tempo real dos recursos do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SystemMonitor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config">
            <BackupConfig />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings notifications={notifications} />
          </TabsContent>

          <TabsContent value="logs">
            <BackupLogs />
          </TabsContent>

          <TabsContent value="deploy">
            <DeploymentGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}