"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  Calendar,
  Database
} from 'lucide-react'

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  category: string
  message: string
  details?: string
  jobId?: string
  jobName?: string
}

export default function BackupLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:45:23',
      level: 'error',
      category: 'Backup',
      message: 'Falha no backup "Arquivos de Sistema"',
      details: 'Erro de acesso negado ao diretório C:\\System\\Protected\\. Verifique as permissões.',
      jobId: '3',
      jobName: 'Arquivos de Sistema'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:30:15',
      level: 'info',
      category: 'Backup',
      message: 'Backup "Documentos Corporativos" iniciado',
      details: 'Processando 1856 arquivos (2.3 GB)',
      jobId: '1',
      jobName: 'Documentos Corporativos'
    },
    {
      id: '3',
      timestamp: '2024-01-15 12:05:42',
      level: 'success',
      category: 'Backup',
      message: 'Backup "Base de Dados" concluído com sucesso',
      details: 'Processados 523 arquivos (1.2 GB) em 45 minutos',
      jobId: '2',
      jobName: 'Base de Dados'
    },
    {
      id: '4',
      timestamp: '2024-01-15 11:30:18',
      level: 'warning',
      category: 'Sistema',
      message: 'Espaço em disco baixo no servidor de backup',
      details: 'Apenas 15% do espaço disponível (150 GB restantes de 1 TB)'
    },
    {
      id: '5',
      timestamp: '2024-01-15 10:15:33',
      level: 'error',
      category: 'Rede',
      message: 'Timeout na conexão com o servidor',
      details: 'Falha ao conectar com 192.168.1.100:8080 após 30 segundos'
    },
    {
      id: '6',
      timestamp: '2024-01-15 09:00:00',
      level: 'info',
      category: 'Sistema',
      message: 'Serviço de backup iniciado',
      details: 'Sistema iniciado com 12 jobs configurados'
    },
    {
      id: '7',
      timestamp: '2024-01-15 08:45:12',
      level: 'success',
      category: 'Segurança',
      message: 'Chave de criptografia renovada',
      details: 'Nova chave AES-256 gerada e aplicada com sucesso'
    },
    {
      id: '8',
      timestamp: '2024-01-15 08:30:05',
      level: 'info',
      category: 'Notificação',
      message: 'Email de relatório enviado',
      details: 'Relatório diário enviado para admin@empresa.com'
    }
  ])

  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(logs)
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Simular novos logs em tempo real
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString('pt-BR'),
        level: ['info', 'warning', 'error', 'success'][Math.floor(Math.random() * 4)] as any,
        category: ['Backup', 'Sistema', 'Rede', 'Segurança'][Math.floor(Math.random() * 4)],
        message: [
          'Verificação de integridade concluída',
          'Backup incremental iniciado',
          'Conexão com servidor restabelecida',
          'Arquivo criptografado com sucesso'
        ][Math.floor(Math.random() * 4)]
      }

      setLogs(prev => [newLog, ...prev.slice(0, 49)]) // Manter apenas 50 logs
    }, 10000) // Novo log a cada 10 segundos

    return () => clearInterval(interval)
  }, [autoRefresh])

  // Filtrar logs
  useEffect(() => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.jobName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(log => log.level === levelFilter)
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(log => log.category === categoryFilter)
    }

    setFilteredLogs(filtered)
  }, [logs, searchTerm, levelFilter, categoryFilter])

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info': return <Info className="w-4 h-4 text-blue-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getLevelBadge = (level: string) => {
    const variants = {
      success: 'default',
      error: 'destructive',
      warning: 'secondary',
      info: 'outline'
    }
    return <Badge variant={variants[level as keyof typeof variants] as any}>{level.toUpperCase()}</Badge>
  }

  const exportLogs = () => {
    const csvContent = [
      'Timestamp,Level,Category,Message,Details,Job',
      ...filteredLogs.map(log => 
        `"${log.timestamp}","${log.level}","${log.category}","${log.message}","${log.details || ''}","${log.jobName || ''}"`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `backup-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const clearLogs = () => {
    if (confirm('Tem certeza que deseja limpar todos os logs?')) {
      setLogs([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas dos Logs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Info</p>
                <p className="text-2xl font-bold">{logs.filter(l => l.level === 'info').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Sucesso</p>
                <p className="text-2xl font-bold">{logs.filter(l => l.level === 'success').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Avisos</p>
                <p className="text-2xl font-bold">{logs.filter(l => l.level === 'warning').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Erros</p>
                <p className="text-2xl font-bold">{logs.filter(l => l.level === 'error').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Controles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Logs do Sistema
          </CardTitle>
          <CardDescription>
            Monitore todas as atividades do sistema de backup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar nos logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Sucesso</SelectItem>
                <SelectItem value="warning">Aviso</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Backup">Backup</SelectItem>
                <SelectItem value="Sistema">Sistema</SelectItem>
                <SelectItem value="Rede">Rede</SelectItem>
                <SelectItem value="Segurança">Segurança</SelectItem>
                <SelectItem value="Notificação">Notificação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </Button>
            <Button variant="outline" size="sm" onClick={exportLogs}>
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
            <Button variant="outline" size="sm" onClick={clearLogs}>
              Limpar Logs
            </Button>
          </div>

          {/* Lista de Logs */}
          <ScrollArea className="h-96 border rounded-lg">
            <div className="p-4 space-y-3">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum log encontrado</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-3 space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {getLevelIcon(log.level)}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{log.message}</span>
                            {log.jobName && (
                              <Badge variant="outline" className="text-xs">
                                {log.jobName}
                              </Badge>
                            )}
                          </div>
                          {log.details && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 break-words">
                              {log.details}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getLevelBadge(log.level)}
                        <Badge variant="outline" className="text-xs">
                          {log.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {log.timestamp}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}