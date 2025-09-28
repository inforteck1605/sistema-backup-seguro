"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Trash2, 
  FolderOpen, 
  Server, 
  Clock, 
  Shield,
  Settings,
  Save,
  TestTube
} from 'lucide-react'

interface BackupRule {
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

export default function BackupConfig() {
  const [backupRules, setBackupRules] = useState<BackupRule[]>([
    {
      id: '1',
      name: 'Documentos Corporativos',
      source: 'C:\\Documentos\\',
      destination: 'Server\\Backup\\Docs\\',
      schedule: 'daily',
      enabled: true,
      encrypted: true,
      compression: true,
      excludePatterns: ['*.tmp', '*.log', 'temp\\*']
    },
    {
      id: '2',
      name: 'Base de Dados',
      source: 'D:\\Database\\',
      destination: 'Server\\Backup\\DB\\',
      schedule: 'hourly',
      enabled: true,
      encrypted: true,
      compression: false,
      excludePatterns: ['*.bak']
    }
  ])

  const [newRule, setNewRule] = useState<Partial<BackupRule>>({
    name: '',
    source: '',
    destination: '',
    schedule: 'daily',
    enabled: true,
    encrypted: true,
    compression: true,
    excludePatterns: []
  })

  const [serverConfig, setServerConfig] = useState({
    serverAddress: '192.168.1.100',
    serverPort: '8080',
    username: 'backup_user',
    password: '',
    maxConcurrentJobs: 3,
    retryAttempts: 3,
    timeout: 300
  })

  const addBackupRule = () => {
    if (newRule.name && newRule.source && newRule.destination) {
      const rule: BackupRule = {
        id: Date.now().toString(),
        name: newRule.name,
        source: newRule.source,
        destination: newRule.destination,
        schedule: newRule.schedule || 'daily',
        enabled: newRule.enabled || true,
        encrypted: newRule.encrypted || true,
        compression: newRule.compression || true,
        excludePatterns: newRule.excludePatterns || []
      }
      setBackupRules([...backupRules, rule])
      setNewRule({
        name: '',
        source: '',
        destination: '',
        schedule: 'daily',
        enabled: true,
        encrypted: true,
        compression: true,
        excludePatterns: []
      })
    }
  }

  const removeBackupRule = (id: string) => {
    setBackupRules(backupRules.filter(rule => rule.id !== id))
  }

  const toggleRule = (id: string) => {
    setBackupRules(backupRules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ))
  }

  const testConnection = () => {
    // Simular teste de conexão
    alert('Testando conexão com o servidor...\n✅ Conexão estabelecida com sucesso!')
  }

  return (
    <div className="space-y-6">
      {/* Configurações do Servidor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Configurações do Servidor
          </CardTitle>
          <CardDescription>
            Configure a conexão com o servidor de backup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serverAddress">Endereço do Servidor</Label>
              <Input
                id="serverAddress"
                value={serverConfig.serverAddress}
                onChange={(e) => setServerConfig({...serverConfig, serverAddress: e.target.value})}
                placeholder="192.168.1.100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serverPort">Porta</Label>
              <Input
                id="serverPort"
                value={serverConfig.serverPort}
                onChange={(e) => setServerConfig({...serverConfig, serverPort: e.target.value})}
                placeholder="8080"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                value={serverConfig.username}
                onChange={(e) => setServerConfig({...serverConfig, username: e.target.value})}
                placeholder="backup_user"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={serverConfig.password}
                onChange={(e) => setServerConfig({...serverConfig, password: e.target.value})}
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxJobs">Jobs Simultâneos</Label>
              <Input
                id="maxJobs"
                type="number"
                value={serverConfig.maxConcurrentJobs}
                onChange={(e) => setServerConfig({...serverConfig, maxConcurrentJobs: parseInt(e.target.value)})}
                min="1"
                max="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retryAttempts">Tentativas</Label>
              <Input
                id="retryAttempts"
                type="number"
                value={serverConfig.retryAttempts}
                onChange={(e) => setServerConfig({...serverConfig, retryAttempts: parseInt(e.target.value)})}
                min="1"
                max="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (seg)</Label>
              <Input
                id="timeout"
                type="number"
                value={serverConfig.timeout}
                onChange={(e) => setServerConfig({...serverConfig, timeout: parseInt(e.target.value)})}
                min="30"
                max="3600"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={testConnection} variant="outline">
              <TestTube className="w-4 h-4 mr-2" />
              Testar Conexão
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Regras de Backup Existentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Regras de Backup
          </CardTitle>
          <CardDescription>
            Gerencie as regras de backup configuradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backupRules.map((rule) => (
              <div key={rule.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <h3 className="font-semibold">{rule.name}</h3>
                    <div className="flex gap-1">
                      {rule.encrypted && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Criptografado
                        </Badge>
                      )}
                      {rule.compression && (
                        <Badge variant="outline" className="text-xs">
                          Compressão
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeBackupRule(rule.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Origem:</span> {rule.source}
                  </div>
                  <div>
                    <span className="font-medium">Destino:</span> {rule.destination}
                  </div>
                  <div>
                    <span className="font-medium">Agendamento:</span> {rule.schedule}
                  </div>
                  <div>
                    <span className="font-medium">Exclusões:</span> {rule.excludePatterns.join(', ') || 'Nenhuma'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adicionar Nova Regra */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Adicionar Nova Regra
          </CardTitle>
          <CardDescription>
            Configure uma nova regra de backup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ruleName">Nome da Regra</Label>
              <Input
                id="ruleName"
                value={newRule.name || ''}
                onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                placeholder="Ex: Backup Documentos"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule">Agendamento</Label>
              <Select value={newRule.schedule} onValueChange={(value) => setNewRule({...newRule, schedule: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">A cada hora</SelectItem>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Pasta de Origem</Label>
              <div className="flex gap-2">
                <Input
                  id="source"
                  value={newRule.source || ''}
                  onChange={(e) => setNewRule({...newRule, source: e.target.value})}
                  placeholder="C:\Documentos\"
                />
                <Button variant="outline" size="sm">
                  <FolderOpen className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Pasta de Destino</Label>
              <div className="flex gap-2">
                <Input
                  id="destination"
                  value={newRule.destination || ''}
                  onChange={(e) => setNewRule({...newRule, destination: e.target.value})}
                  placeholder="Server\Backup\Docs\"
                />
                <Button variant="outline" size="sm">
                  <FolderOpen className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excludePatterns">Padrões de Exclusão (um por linha)</Label>
            <Textarea
              id="excludePatterns"
              placeholder="*.tmp&#10;*.log&#10;temp\*&#10;node_modules\*"
              rows={3}
              onChange={(e) => setNewRule({...newRule, excludePatterns: e.target.value.split('\n').filter(p => p.trim())})}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="encrypted"
                checked={newRule.encrypted || false}
                onCheckedChange={(checked) => setNewRule({...newRule, encrypted: checked})}
              />
              <Label htmlFor="encrypted">Criptografia AES-256</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="compression"
                checked={newRule.compression || false}
                onCheckedChange={(checked) => setNewRule({...newRule, compression: checked})}
              />
              <Label htmlFor="compression">Compressão</Label>
            </div>
          </div>

          <Button onClick={addBackupRule} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Regra de Backup
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}