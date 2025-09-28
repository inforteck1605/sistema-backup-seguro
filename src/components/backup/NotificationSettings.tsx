"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Mail, 
  MessageCircle, 
  Send, 
  Bell, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Settings,
  TestTube,
  Save
} from 'lucide-react'

interface NotificationChannel {
  id: string
  type: 'email' | 'whatsapp' | 'telegram'
  name: string
  enabled: boolean
  config: any
}

interface NotificationSettings {
  onSuccess: boolean
  onFailure: boolean
  onWarning: boolean
  onStart: boolean
  channels: NotificationChannel[]
}

export default function NotificationSettings({ notifications }: { notifications: any[] }) {
  const [settings, setSettings] = useState<NotificationSettings>({
    onSuccess: true,
    onFailure: true,
    onWarning: true,
    onStart: false,
    channels: [
      {
        id: '1',
        type: 'email',
        name: 'Email Principal',
        enabled: true,
        config: {
          smtp: 'smtp.gmail.com',
          port: 587,
          username: 'backup@empresa.com',
          password: '',
          to: 'admin@empresa.com'
        }
      },
      {
        id: '2',
        type: 'whatsapp',
        name: 'WhatsApp Business',
        enabled: true,
        config: {
          apiKey: '',
          phoneNumber: '+5511999999999',
          instanceId: ''
        }
      },
      {
        id: '3',
        type: 'telegram',
        name: 'Telegram Bot',
        enabled: false,
        config: {
          botToken: '',
          chatId: ''
        }
      }
    ]
  })

  const [testResults, setTestResults] = useState<{[key: string]: 'success' | 'error' | 'testing'}>({})

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />
      case 'telegram': return <Send className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default: return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const testChannel = async (channelId: string) => {
    setTestResults({...testResults, [channelId]: 'testing'})
    
    // Simular teste
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% chance de sucesso
      setTestResults({...testResults, [channelId]: success ? 'success' : 'error'})
    }, 2000)
  }

  const toggleChannel = (channelId: string) => {
    setSettings({
      ...settings,
      channels: settings.channels.map(channel =>
        channel.id === channelId ? { ...channel, enabled: !channel.enabled } : channel
      )
    })
  }

  const updateChannelConfig = (channelId: string, field: string, value: string) => {
    setSettings({
      ...settings,
      channels: settings.channels.map(channel =>
        channel.id === channelId 
          ? { ...channel, config: { ...channel.config, [field]: value } }
          : channel
      )
    })
  }

  return (
    <div className="space-y-6">
      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações de Notificação
          </CardTitle>
          <CardDescription>
            Configure quando e como receber notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="onSuccess"
                checked={settings.onSuccess}
                onCheckedChange={(checked) => setSettings({...settings, onSuccess: checked})}
              />
              <Label htmlFor="onSuccess" className="text-sm">Sucesso</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="onFailure"
                checked={settings.onFailure}
                onCheckedChange={(checked) => setSettings({...settings, onFailure: checked})}
              />
              <Label htmlFor="onFailure" className="text-sm">Falhas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="onWarning"
                checked={settings.onWarning}
                onCheckedChange={(checked) => setSettings({...settings, onWarning: checked})}
              />
              <Label htmlFor="onWarning" className="text-sm">Avisos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="onStart"
                checked={settings.onStart}
                onCheckedChange={(checked) => setSettings({...settings, onStart: checked})}
              />
              <Label htmlFor="onStart" className="text-sm">Início</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canais de Notificação */}
      {settings.channels.map((channel) => (
        <Card key={channel.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getChannelIcon(channel.type)}
                {channel.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                {testResults[channel.id] && (
                  <Badge variant={testResults[channel.id] === 'success' ? 'default' : 'destructive'}>
                    {testResults[channel.id] === 'testing' ? 'Testando...' : 
                     testResults[channel.id] === 'success' ? 'Sucesso' : 'Erro'}
                  </Badge>
                )}
                <Switch
                  checked={channel.enabled}
                  onCheckedChange={() => toggleChannel(channel.id)}
                />
              </div>
            </div>
            <CardDescription>
              Configure as credenciais para {channel.type}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {channel.type === 'email' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Servidor SMTP</Label>
                  <Input
                    value={channel.config.smtp}
                    onChange={(e) => updateChannelConfig(channel.id, 'smtp', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Porta</Label>
                  <Input
                    value={channel.config.port}
                    onChange={(e) => updateChannelConfig(channel.id, 'port', e.target.value)}
                    placeholder="587"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Usuário</Label>
                  <Input
                    value={channel.config.username}
                    onChange={(e) => updateChannelConfig(channel.id, 'username', e.target.value)}
                    placeholder="backup@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Senha</Label>
                  <Input
                    type="password"
                    value={channel.config.password}
                    onChange={(e) => updateChannelConfig(channel.id, 'password', e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Email de Destino</Label>
                  <Input
                    value={channel.config.to}
                    onChange={(e) => updateChannelConfig(channel.id, 'to', e.target.value)}
                    placeholder="admin@empresa.com"
                  />
                </div>
              </div>
            )}

            {channel.type === 'whatsapp' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    value={channel.config.apiKey}
                    onChange={(e) => updateChannelConfig(channel.id, 'apiKey', e.target.value)}
                    placeholder="Sua chave da API WhatsApp"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instance ID</Label>
                  <Input
                    value={channel.config.instanceId}
                    onChange={(e) => updateChannelConfig(channel.id, 'instanceId', e.target.value)}
                    placeholder="ID da instância"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Número de Telefone</Label>
                  <Input
                    value={channel.config.phoneNumber}
                    onChange={(e) => updateChannelConfig(channel.id, 'phoneNumber', e.target.value)}
                    placeholder="+5511999999999"
                  />
                </div>
              </div>
            )}

            {channel.type === 'telegram' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bot Token</Label>
                  <Input
                    value={channel.config.botToken}
                    onChange={(e) => updateChannelConfig(channel.id, 'botToken', e.target.value)}
                    placeholder="123456789:ABCdefGHIjklMNOpqrSTUvwxyz"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Chat ID</Label>
                  <Input
                    value={channel.config.chatId}
                    onChange={(e) => updateChannelConfig(channel.id, 'chatId', e.target.value)}
                    placeholder="-1001234567890"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => testChannel(channel.id)}
                disabled={!channel.enabled || testResults[channel.id] === 'testing'}
              >
                <TestTube className="w-4 h-4 mr-2" />
                {testResults[channel.id] === 'testing' ? 'Testando...' : 'Testar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Notificações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificações Recentes
          </CardTitle>
          <CardDescription>
            Histórico das últimas notificações enviadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
                {getNotificationTypeIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
                <Badge variant={notification.read ? 'outline' : 'default'}>
                  {notification.read ? 'Lida' : 'Nova'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salvar Configurações */}
      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}