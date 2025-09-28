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
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Key, 
  Lock, 
  Unlock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Save
} from 'lucide-react'

interface SecurityConfig {
  encryptionEnabled: boolean
  encryptionAlgorithm: string
  keySize: number
  passwordProtection: boolean
  twoFactorAuth: boolean
  sslEnabled: boolean
  certificatePath: string
  keyRotationDays: number
  backupIntegrity: boolean
}

export default function SecuritySettings() {
  const [config, setConfig] = useState<SecurityConfig>({
    encryptionEnabled: true,
    encryptionAlgorithm: 'AES-256',
    keySize: 256,
    passwordProtection: true,
    twoFactorAuth: false,
    sslEnabled: true,
    certificatePath: '/certs/backup.crt',
    keyRotationDays: 90,
    backupIntegrity: true
  })

  const [keyGeneration, setKeyGeneration] = useState({
    generating: false,
    progress: 0,
    lastGenerated: '2024-01-10 15:30:00'
  })

  const [certificates, setCertificates] = useState([
    {
      id: '1',
      name: 'Certificado Principal',
      type: 'SSL/TLS',
      status: 'valid',
      expiresAt: '2024-12-31',
      issuer: 'Let\'s Encrypt'
    },
    {
      id: '2',
      name: 'Certificado de Backup',
      type: 'Self-Signed',
      status: 'warning',
      expiresAt: '2024-06-15',
      issuer: 'Internal CA'
    }
  ])

  const generateNewKey = () => {
    setKeyGeneration({ ...keyGeneration, generating: true, progress: 0 })
    
    const interval = setInterval(() => {
      setKeyGeneration(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval)
          return {
            generating: false,
            progress: 100,
            lastGenerated: new Date().toLocaleString('pt-BR')
          }
        }
        return { ...prev, progress: prev.progress + 10 }
      })
    }, 200)
  }

  const getCertificateStatus = (status: string) => {
    switch (status) {
      case 'valid':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Válido</Badge>
      case 'warning':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Expirando</Badge>
      case 'expired':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Expirado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Configurações de Criptografia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Configurações de Criptografia
          </CardTitle>
          <CardDescription>
            Configure a segurança dos seus backups
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Criptografia de Dados</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Criptografar todos os arquivos de backup
              </p>
            </div>
            <Switch
              checked={config.encryptionEnabled}
              onCheckedChange={(checked) => setConfig({...config, encryptionEnabled: checked})}
            />
          </div>

          {config.encryptionEnabled && (
            <div className="space-y-4 pl-4 border-l-2 border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Algoritmo de Criptografia</Label>
                  <Select 
                    value={config.encryptionAlgorithm} 
                    onValueChange={(value) => setConfig({...config, encryptionAlgorithm: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AES-256">AES-256 (Recomendado)</SelectItem>
                      <SelectItem value="AES-192">AES-192</SelectItem>
                      <SelectItem value="AES-128">AES-128</SelectItem>
                      <SelectItem value="ChaCha20">ChaCha20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tamanho da Chave (bits)</Label>
                  <Select 
                    value={config.keySize.toString()} 
                    onValueChange={(value) => setConfig({...config, keySize: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128">128 bits</SelectItem>
                      <SelectItem value="192">192 bits</SelectItem>
                      <SelectItem value="256">256 bits (Recomendado)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Proteção por Senha</Label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Adicionar camada extra de proteção
                  </p>
                </div>
                <Switch
                  checked={config.passwordProtection}
                  onCheckedChange={(checked) => setConfig({...config, passwordProtection: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Verificação de Integridade</Label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Verificar integridade dos backups
                  </p>
                </div>
                <Switch
                  checked={config.backupIntegrity}
                  onCheckedChange={(checked) => setConfig({...config, backupIntegrity: checked})}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gerenciamento de Chaves */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Gerenciamento de Chaves
          </CardTitle>
          <CardDescription>
            Gerencie as chaves de criptografia
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rotação de Chaves (dias)</Label>
              <Input
                type="number"
                value={config.keyRotationDays}
                onChange={(e) => setConfig({...config, keyRotationDays: parseInt(e.target.value)})}
                min="30"
                max="365"
              />
            </div>
            <div className="space-y-2">
              <Label>Última Geração</Label>
              <Input
                value={keyGeneration.lastGenerated}
                disabled
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>

          {keyGeneration.generating && (
            <div className="space-y-2">
              <Label>Gerando nova chave...</Label>
              <Progress value={keyGeneration.progress} className="h-2" />
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={generateNewKey}
              disabled={keyGeneration.generating}
              variant="outline"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${keyGeneration.generating ? 'animate-spin' : ''}`} />
              {keyGeneration.generating ? 'Gerando...' : 'Gerar Nova Chave'}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Chave
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar Chave
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificados SSL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Certificados SSL/TLS
          </CardTitle>
          <CardDescription>
            Gerencie os certificados para conexões seguras
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">SSL/TLS Habilitado</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Usar conexões criptografadas
              </p>
            </div>
            <Switch
              checked={config.sslEnabled}
              onCheckedChange={(checked) => setConfig({...config, sslEnabled: checked})}
            />
          </div>

          {config.sslEnabled && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Caminho do Certificado</Label>
                <Input
                  value={config.certificatePath}
                  onChange={(e) => setConfig({...config, certificatePath: e.target.value})}
                  placeholder="/path/to/certificate.crt"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Certificados Instalados</Label>
                {certificates.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{cert.name}</h4>
                      {getCertificateStatus(cert.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-medium">Tipo:</span> {cert.type}
                      </div>
                      <div>
                        <span className="font-medium">Expira em:</span> {cert.expiresAt}
                      </div>
                      <div>
                        <span className="font-medium">Emissor:</span> {cert.issuer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Autenticação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações de Autenticação
          </CardTitle>
          <CardDescription>
            Configure métodos de autenticação adicionais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Autenticação de Dois Fatores</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adicionar camada extra de segurança
              </p>
            </div>
            <Switch
              checked={config.twoFactorAuth}
              onCheckedChange={(checked) => setConfig({...config, twoFactorAuth: checked})}
            />
          </div>

          {config.twoFactorAuth && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Configure um aplicativo autenticador (Google Authenticator, Authy) para usar 2FA.
                <Button variant="link" className="p-0 h-auto ml-2">
                  Configurar agora
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Salvar Configurações */}
      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações de Segurança
        </Button>
      </div>
    </div>
  )
}