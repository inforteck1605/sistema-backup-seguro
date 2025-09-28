"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  Wifi,
  Zap,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface SystemMetrics {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkSpeed: number
  activeConnections: number
  throughput: number
}

export default function SystemMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkSpeed: 125.5,
    activeConnections: 8,
    throughput: 89.2
  })

  const [trends, setTrends] = useState({
    cpu: 'stable',
    memory: 'up',
    disk: 'down',
    network: 'up'
  })

  // Simular métricas em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        diskUsage: Math.max(0, Math.min(100, prev.diskUsage + (Math.random() - 0.5) * 2)),
        networkSpeed: Math.max(0, prev.networkSpeed + (Math.random() - 0.5) * 20),
        activeConnections: Math.max(0, Math.floor(prev.activeConnections + (Math.random() - 0.5) * 3)),
        throughput: Math.max(0, prev.throughput + (Math.random() - 0.5) * 15)
      }))

      // Atualizar tendências
      setTrends({
        cpu: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
        memory: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
        disk: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
        network: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable'
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-red-500" />
      case 'down': return <TrendingDown className="w-3 h-3 text-green-500" />
      default: return <Activity className="w-3 h-3 text-gray-500" />
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage > 80) return 'text-red-500'
    if (usage > 60) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getProgressColor = (usage: number) => {
    if (usage > 80) return 'bg-red-500'
    if (usage > 60) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* CPU Usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              CPU
            </div>
            {getTrendIcon(trends.cpu)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-2xl font-bold ${getUsageColor(metrics.cpuUsage)}`}>
                {metrics.cpuUsage.toFixed(1)}%
              </span>
              <Badge variant="outline" className="text-xs">
                {metrics.cpuUsage > 80 ? 'Alto' : metrics.cpuUsage > 60 ? 'Médio' : 'Normal'}
              </Badge>
            </div>
            <Progress 
              value={metrics.cpuUsage} 
              className="h-2"
              style={{
                '--progress-background': getProgressColor(metrics.cpuUsage)
              } as any}
            />
          </div>
        </CardContent>
      </Card>

      {/* Memory Usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MemoryStick className="w-4 h-4" />
              Memória
            </div>
            {getTrendIcon(trends.memory)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-2xl font-bold ${getUsageColor(metrics.memoryUsage)}`}>
                {metrics.memoryUsage.toFixed(1)}%
              </span>
              <Badge variant="outline" className="text-xs">
                {(metrics.memoryUsage * 0.16).toFixed(1)} GB
              </Badge>
            </div>
            <Progress 
              value={metrics.memoryUsage} 
              className="h-2"
              style={{
                '--progress-background': getProgressColor(metrics.memoryUsage)
              } as any}
            />
          </div>
        </CardContent>
      </Card>

      {/* Disk Usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Disco
            </div>
            {getTrendIcon(trends.disk)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-2xl font-bold ${getUsageColor(metrics.diskUsage)}`}>
                {metrics.diskUsage.toFixed(1)}%
              </span>
              <Badge variant="outline" className="text-xs">
                {(1000 - (metrics.diskUsage * 10)).toFixed(0)} GB livre
              </Badge>
            </div>
            <Progress 
              value={metrics.diskUsage} 
              className="h-2"
              style={{
                '--progress-background': getProgressColor(metrics.diskUsage)
              } as any}
            />
          </div>
        </CardContent>
      </Card>

      {/* Network Speed */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              Rede
            </div>
            {getTrendIcon(trends.network)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-500">
                {metrics.networkSpeed.toFixed(1)}
              </span>
              <Badge variant="outline" className="text-xs">
                MB/s
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              {metrics.activeConnections} conexões ativas
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Throughput */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Throughput
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-purple-500">
                {metrics.throughput.toFixed(1)}
              </span>
              <Badge variant="outline" className="text-xs">
                GB/h
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Taxa de backup atual
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Status Geral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-500">
                Ótimo
              </span>
              <Badge className="bg-green-500">
                Online
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Todos os sistemas funcionando
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}